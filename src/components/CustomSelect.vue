<script setup>
	import MultiSelect from "primevue/multiselect";

	import { ref } from "vue";

	const selectedCities = ref([]);
	const cities = ref([
		{ name: "New York", code: "NY" },
		{ name: "Rome", code: "RM" },
		{ name: "London", code: "LDN" },
		{ name: "Istanbul", code: "IST" },
		{ name: "Paris", code: "PRS" },
	]);

	// const onClearSelect = () => (selectedCities.value = []);
</script>

<template>
	<div class="custom-select">
		<MultiSelect
			class="custom-select__multiselect"
			v-model="selectedCities"
			:options="cities"
			optionLabel="name"
			placeholder="Select Cities"
			:maxSelectedLabels="3"
		/>

		<Transition name="fade-default">
			<button
				v-if="selectedCities.length"
				class="custom-select__clear"
				@click="selectedCities = []"
			>
				<i class="pi pi-times"></i>
			</button>
		</Transition>
	</div>
</template>

<style lang="scss" scoped>
	.custom-select {
		position: relative;
		width: fit-content;

		&__multiselect {
			width: 400px;
		}

		&__clear {
			position: absolute;
			right: 40px;
			top: 50%;
			transform: translateY(-50%);

			padding: 6px;
		}
	}
</style>
