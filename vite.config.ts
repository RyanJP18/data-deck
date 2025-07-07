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
                    additionalData: `
                        @use '@/styles/sizings.scss' as *;
                        @use '@/styles/colors.scss' as *;
                        @use '@/styles/mixins.scss' as *;
                    `
                }
            }
        },
        test: {
            globals: true,
            environment: 'jsdom',
            include: ['**/*.test.ts', '**/*.spec.ts'],
        },
        build: {
            sourcemap: true,
            lib: {
                entry: path.resolve(__dirname, 'src/index.ts'),
                name: 'DataDeck',
                fileName: (format) => `index.${format}.js`,
                formats: ['es', 'cjs'],
            },
            rollupOptions: {
                external: ['vue'],
                output: {
                    globals: { vue: 'Vue' },
                }
            }
        },
    };
});
