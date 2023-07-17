import { writable } from 'svelte/store';
import { v4 as uuid } from 'uuid';

export type Toast = {
	id: string;
	title: string;
	message: string;
	type: 'success' | 'warning' | 'danger' | 'info';
	duration: number;
	onExit?: () => void;
};

export type ToastPosition =
	| 'bottom-left'
	| 'bottom-right'
	| 'bottom-center'
	| 'top-center'
	| 'top-left'
	| 'top-right';

export const toastQueue = writable<Toast[]>([]);

export function toast(t: Omit<Toast, 'id'>) {
	const id = uuid();

	setTimeout(() => {
		deleteToast(id);

		if (t.onExit) t.onExit();
	}, t.duration);

	toastQueue.update((queue) => {
		queue.push({ id, ...t });
		return queue;
	});
}

function deleteToast(id: string) {
	toastQueue.update((queue) => {
		return queue.filter((t) => t.id !== id);
	});
}

export function generate_test_toasts() {
	toast({
		title: 'Test Toast',
		message: 'This toast is just a test',
		type: 'success',
		duration: Math.floor(Math.random() * 7000 + 2000)
	});
	toast({
		title: 'Test Toast',
		message: 'This toast is just a test',
		type: 'warning',
		duration: Math.floor(Math.random() * 7000 + 2000)
	});
	toast({
		title: 'Test Toast',
		message: 'This toast is just a test',
		type: 'danger',
		duration: Math.floor(Math.random() * 7000 + 2000)
	});
	toast({
		title: 'Test Toast',
		message: 'This toast is just a test',
		type: 'info',
		duration: Math.floor(Math.random() * 7000 + 2000)
	});
}
