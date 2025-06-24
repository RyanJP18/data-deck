import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig(() => {
    return {
        plugins: [vue()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src/')
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                    additionalData: ''
                }
            }
        },
        test: {
            globals: true,
            environment: 'jsdom',
            include: ['**/*.test.ts', '**/*.spec.ts'],
        },
        server: {
        }, 
        build: {
            minify: true,
            sourcemap: false,
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString();
                        }
                    }
                }
            }
        },
    };
});
