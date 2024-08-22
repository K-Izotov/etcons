<script setup>
	import DatePicker from "primevue/datepicker";

	const pickerValue = defineModel({ default: null });
</script>

<template>
	<DatePicker
		v-model="pickerValue"
		timeOnly
	/>
</template>

<style lang="scss" scoped></style>
