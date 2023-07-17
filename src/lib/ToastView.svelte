<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { ToastPosition } from '$lib/psl-toast.js';
	import { toastQueue } from '$lib/psl-toast.js';

	export let position: ToastPosition = 'bottom-left';

	$: transition = {
		x:
			position === 'bottom-left' || position === 'top-left'
				? -500
				: position === 'bottom-right' || position === 'top-right'
				? 500
				: undefined,
		y: position === 'bottom-center' ? 500 : position === 'top-center' ? -500 : undefined
	};
</script>

<div
	class="flex flex-col gap-2 absolute left-1/2 z-50"
	class:left-4={position === 'bottom-left' || position === 'top-left'}
	class:right-4={position === 'bottom-right' || position === 'top-right'}
	class:bottom-8={position === 'bottom-left' ||
		position === 'bottom-center' ||
		position === 'bottom-right'}
	class:top-8={position === 'top-left' || position === 'top-center' || position === 'top-right'}
	class:left-[50%]={position === 'top-center' || position === 'bottom-center'}
	class:mx-auto={position === 'top-center' || position === 'bottom-center'}
>
	{#each $toastQueue as t}
		<div
			class="py-4 px-6 w-[370px] relative"
			class:bg-gray-200={t.type === 'info'}
			class:bg-green-200={t.type === 'success'}
			class:bg-red-200={t.type === 'danger'}
			class:bg-yellow-200={t.type === 'warning'}
			class:left-[-50%]={position === 'top-center' || position === 'bottom-center'}
			transition:fly={transition}
			style="--duration: {t.duration}ms;"
		>
			<h3
				class="text-lg font-bold"
				class:text-gray-600={t.type === 'info'}
				class:text-green-600={t.type === 'success'}
				class:text-red-600={t.type === 'danger'}
				class:text-yellow-600={t.type === 'warning'}
			>
				{t.title}
			</h3>
			<p
				class:text-gray-500={t.type === 'info'}
				class:text-green-500={t.type === 'success'}
				class:text-red-500={t.type === 'danger'}
				class:text-yellow-500={t.type === 'warning'}
			>
				{t.message}
			</p>
			<div
				class="progress-bar h-[3px]"
				class:bg-gray-600={t.type === 'info'}
				class:bg-green-600={t.type === 'success'}
				class:bg-red-600={t.type === 'danger'}
				class:bg-yellow-600={t.type === 'warning'}
			/>
		</div>
	{/each}
</div>

<style>
	@keyframes progress-bar-animation {
		from {
			width: 0;
		}
		to {
			width: 370px;
		}
	}

	.progress-bar {
		position: absolute;
		left: 0;
		bottom: 0;
		animation-name: progress-bar-animation;
		animation-duration: var(--duration);
		content: var(--duration);
	}
</style>
