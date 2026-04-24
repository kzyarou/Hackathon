import { registerEntitySecretCiphertext } from '@circle-fin/developer-controlled-wallets';
import * as dotenv from 'dotenv';

dotenv.config();

async function register() {
    try {
        console.log('connecting to Circle to register entity secret ciphertext...');

        const response = await registerEntitySecretCiphertext({
            apiKey: process.env.CIRCLE_API_KEY!,
            entitySecret: process.env.ENTITY_SECRET!,
        });

        console.log('SUCCESSS! your engine is registered.');
        console.log('recovery file content (SAVE THIS!):', response.data?.recoveryFile);
        console.log('\nYour engin is now ready to create agent wallets.');
    } catch (error) {
        console.error('Registration failed:', error);
    }
}
register();