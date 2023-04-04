import {signal} from '@preact/signals';
import { PageProps } from '$fresh/server.ts';

export const pageProps = signal<Partial<PageProps>>({});
