<script setup>
	import TimePicker from "@/components/TimePicker.vue";
	import CustomSelect from "@/components/CustomSelect.vue";
	import DataTable from "@/components/DataTable.vue";
	import TableSearch from "@/components/TableSearch.vue";

	import { ref } from "vue";

	const timePickerValue = ref(new Date());
</script>

<template>
	<main class="main">
		<div class="main__container">
			<div class="main__inner">
				<div class="main__block">
					<h2 class="main__block-title">1.</h2>

					<div class="main__block-content">-</div>
				</div>

				<hr />

				<div class="main__block">
					<h2 class="main__block-title">2.</h2>

					<div class="main__block-content">
						<TimePicker v-model="timePickerValue" />

						<p>
							Значение переменной директивы v-model:
							{{ timePickerValue.getHours() }}:
							{{ timePickerValue.getMinutes() }}
						</p>
					</div>
				</div>

				<hr />

				<div class="main__block">
					<h2 class="main__block-title">3.</h2>

					<div class="main__block-content">
						<CustomSelect />
					</div>
				</div>

				<hr />

				<div class="main__block">
					<h2 class="main__block-title">4.</h2>

					<div class="main__block-content">
						<DataTable />
					</div>
				</div>

				<hr />

				<div class="main__block">
					<h2 class="main__block-title">5.</h2>

					<div class="main__block-content">
						<TableSearch />
					</div>
				</div>

				<hr />
			</div>
		</div>
	</main>
</template>

<style lang="scss">
	@import "primeicons/primeicons.css";

	@import "@/assets/scss/normilize";
	@import "@/assets/scss/settings";
	@import "@/assets/scss/base";

	.main {
		padding-top: 60px;
		padding-bottom: 200px;

		&__container {
			max-width: 1100px;
			margin: 0 auto;
		}

		&__block {
			padding: 40px 0;

			&-title {
				margin-bottom: 30px;

				font-size: 40px;
				font-weight: 600;
				letter-spacing: 4px;
			}

			&-content {
				& > p {
					margin-top: 20px;
					font-size: 14px;
				}
			}
		}
	}
</style>
