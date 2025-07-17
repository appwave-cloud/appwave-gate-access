"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
	const [username, setUsername] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

	const userQuery = api.firewall.getUserVpnConfig.useQuery(
		{ username },
		{ enabled: submitted && !!username }
	);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitted(true);
	};

	const handleDownload = () => {
		if (userQuery.data?.config) {
			const blob = new Blob([userQuery.data.config], { type: "application/x-openvpn-profile" });
			const url = URL.createObjectURL(blob);
			setDownloadUrl(url);
			setTimeout(() => URL.revokeObjectURL(url), 10000);
		}
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-background">
			<div className="mx-4 w-full max-w-md">
				<Card>
					<CardHeader className="text-center">
						<CardTitle className="text-2xl">OpenVPN Zugang</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-2">
								<input
									type="text"
									placeholder="Benutzername eingeben"
									value={username}
									onChange={e => { setUsername(e.target.value); setSubmitted(false); }}
									className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
									required
								/>
							</div>
							<Button
								type="submit"
								className="w-full"
								disabled={userQuery.isLoading}
							>
								{userQuery.isLoading ? "Suche..." : "Benutzer prüfen"}
							</Button>
						</form>

						{submitted && userQuery.isSuccess && userQuery.data.found && (
							<div className="space-y-3 pt-4">
								<Button
									onClick={handleDownload}
									variant="default"
									className="w-full"
								>
									OpenVPN Konfiguration herunterladen
								</Button>
								{downloadUrl && (
									<a
										href={downloadUrl}
										download={`${username}.ovpn`}
										className="block text-center text-primary text-sm underline transition-colors hover:text-primary/80"
									>
										Download starten
									</a>
								)}
							</div>
						)}

						{submitted && userQuery.isSuccess && !userQuery.data.found && (
							<div className="pt-4">
								<p className="text-center text-destructive text-sm">Benutzer nicht gefunden.</p>
							</div>
						)}

						{userQuery.isError && (
							<div className="pt-4">
								<p className="text-center text-destructive text-sm">Fehler bei der Anfrage.</p>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</main>
	);
}