import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import z from "zod";
import { env } from "@/env";
import axios from "axios";

// Type for OpenVPN client
interface OpenVPNClient {
  uuid: string;
  descr: string;
  common_name: string;
}

// OPNsense API authentication helper
function createOPNsenseAuthHeaders() {
  // Create Basic Auth header with API_KEY as username and API_SECRET as password
  const credentials = Buffer.from(`${env.OPNSENSE_API_KEY}:${env.OPNSENSE_API_SECRET}`).toString('base64');

  return {
    'Authorization': `Basic ${credentials}`,
  };
}

export const firewallRouter = createTRPCRouter({
  testConnection: publicProcedure.mutation(async ({ ctx }) => {
    try {
      const endpoint = "/api/core/firmware/status";
      const url = `${env.OPNSENSE_API_URL}${endpoint}`;

      const headers = createOPNsenseAuthHeaders();

      const response = await axios.get(url, {
        headers: {
          ...headers,
        },
      });

      console.log(response.data);

      const data = response.data;

      if (response.data.product.product_time) {
        return {
          success: true,
          message: "Connection test successful",
        };
      }

      return {
        success: false,
        message: "Connection test failed",
      };
    } catch (error) {
      console.error('OPNsense API connection test failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Connection test failed",
      };
    }
  }),

  getUserVpnConfig: publicProcedure
    .input(z.object({ username: z.string().min(1) }))
    .query(async ({ input }) => {
      const headers = createOPNsenseAuthHeaders();

      try {
        // First, get all OpenVPN servers to find available configurations
        const serversUrl = `${env.OPNSENSE_API_URL}/api/openvpn/server/search`;
        const serversResponse = await axios.get(serversUrl, {
          headers: {
            ...headers,
          },
        });

        console.log('OpenVPN servers response:', serversResponse.data);

        // Get the first available server (usually there's only one)
        const servers = serversResponse.data.rows || [];
        if (servers.length === 0) {
          return { found: false, message: "No OpenVPN servers found" };
        }

        const server = servers[0]; // Use the first server

        // Get the server configuration
        const serverUrl = `${env.OPNSENSE_API_URL}/api/openvpn/server/get/${server.uuid}`;
        const serverResponse = await axios.get(serverUrl, {
          headers: {
            ...headers,
          },
        });

        console.log('Server config response:', serverResponse.data);

        // Generate a client configuration for the username
        // This would typically involve creating a client certificate
        // For now, we'll return a template configuration
        const clientConfig = `# OpenVPN Client Configuration for ${input.username}
# Generated from OPNsense Firewall

client
dev tun
proto udp
remote ${env.OPNSENSE_API_URL.replace('https://', '').replace('/api', '')} 1194
resolv-retry infinite
nobind
persist-key
persist-tun
remote-cert-tls server
cipher AES-256-CBC
auth SHA256
key-direction 1
verb 3

# Certificate and key data would be included here
# <ca>
# </ca>
# <cert>
# </cert>
# <key>
# </key>

# Username: ${input.username}
# Server: ${server.descr || 'OPNsense VPN'}
`;

        return {
          found: true,
          config: clientConfig,
          clientInfo: {
            username: input.username,
            server: server.descr,
            serverUuid: server.uuid
          }
        };

      } catch (error) {
        console.error('Error getting VPN config:', error);
        return {
          found: false,
          message: error instanceof Error ? error.message : "Failed to get VPN configuration"
        };
      }
    }),
})