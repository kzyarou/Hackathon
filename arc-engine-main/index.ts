import { initiateDeveloperControlledWalletsClient } from '@circle-fin/developer-controlled-wallets';
import * as dotenv from 'dotenv';
dotenv.config();

const client = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY?.trim() || '',
  entitySecret: process.env.ENTITY_SECRET?.trim() || ''
});

async function startEngine() {
  console.log("🚀 Powering up the Arc Engine...");
  try {
    // This one command replaces all your manual axios logic
    const response = await client.listWallets({});
    
    console.log("✅ Connection Successful!");
      console.log("📊 Wallets Found:", response.data?.wallets?.length || 0);
      
      console.log("Creating Wallet...");
      const walletSet = await client.createWalletSet({
          name: "Hackathon Main Set"
      });

      console.log("Generating Your First Wallet Address...");
      const wallet = await client.createWallets({
          accountType: 'SCA',
          blockchains: ['ETH-SEPOLIA'],
          count: 1,
          walletSetId: walletSet.data?.walletSet.id || ''
      });
        
      console.log("🎉 Success! Your Agent's Wallet Address:");
      console.log(wallet.data?.wallets[0]?.address || "No address found");

  } catch (error: any) {
    console.error("❌ Engine Error:", error.message);
    if (error.response) {
        console.error("🔍 Circle says:", error.response.data);
    }
  }
}

startEngine();
