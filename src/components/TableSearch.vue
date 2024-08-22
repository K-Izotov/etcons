<script setup>
	import DataTable from "primevue/datatable";
	import Column from "primevue/column";
	import InputText from "primevue/inputtext";
	import Tag from "primevue/tag";
	import MultiSelect from "primevue/multiselect";
	import Button from "primevue/button";
	import TieredMenu from "primevue/tieredmenu";
	import Checkbox from "primevue/checkbox";

	import { FilterMatchMode, FilterOperator } from "@primevue/core/api";
	import { ref, onBeforeMount } from "vue";

	import data from "../assets/data/fakeData.json";

	const searchValue = ref("");

	const filters = ref({});
	const stateFilterColumns = ref([
		{
			label: "name",
			value: true,
		},
		{
			label: "country.name",
			value: true,
		},
		{
			label: "representative.name",
			value: true,
		},
		{
			label: "balance",
			value: true,
		},
		{
			label: "status",
			value: true,
		},
	]);

	const filterColumns = ref([]);

	const menu = ref(null);
	const toggle = (event) => {
		menu.value.toggle(event);
	};

	const showColumns = ref([]);
	const columns = ref([
		{ name: "name" },
		{ name: "country" },
		{ name: "representative" },
		{ name: "balance" },
		{ name: "status" },
	]);

	const initFilters = () => {
		filters.value = {
			global: { value: null, matchMode: FilterMatchMode.CONTAINS },
			name: {
				operator: FilterOperator.AND,
				constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
			},
			"country.name": {
				operator: FilterOperator.AND,
				constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
			},
			representative: { value: null, matchMode: FilterMatchMode.IN },
			date: {
				operator: FilterOperator.AND,
				constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
			},
			balance: {
				operator: FilterOperator.AND,
				constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
			},
		};
	};

	const formatCurrency = (value) => {
		return value.toLocaleString("en-US", {
			style: "currency",
			currency: "USD",
		});
	};

	const collectFilterColumns = () =>
		(filterColumns.value = stateFilterColumns.value
			.filter((el) => el.value)
			.map((el) => el.label));

	const getSeverity = (status) => {
		switch (status) {
			case "unqualified":
				return "danger";

			case "qualified":
				return "success";

			case "new":
				return "info";

			case "negotiation":
				return "warn";

			case "renewal":
				return null;
		}
	};

	const onSearch = () => (filters.value["global"].value = searchValue.value);

	const onHiddenColumn = (name) =>
		!showColumns.value.some((column) => column.name === name);

	initFilters();
	collectFilterColumns();

	onBeforeMount(() => {
		showColumns.value = columns.value;
	});
</script>

<template>
	<DataTable
		class="table"
		v-model:filters="filters"
		dataKey="id"
		paginator
		:value="data"
		:rows="4"
		:globalFilterFields="filterColumns"
	>
		<template #header>
			<div class="table__head">
				<div class="table__search">
					<Button
						type="button"
						icon="pi pi-sliders-v"
						@click="toggle"
					/>

					<TieredMenu
						ref="menu"
						:model="stateFilterColumns"
						popup
					>
						<template #item="{ item, props }">
							<div
								v-bind="props.action"
								@click.stop="(item.value = !item.value), collectFilterColumns()"
							>
								<Checkbox
									v-model="item.value"
									:binary="true"
								/>

								<span>{{ item.label }}</span>
							</div>
						</template>
					</TieredMenu>

					<!-- v-model="filters['global'].value" -->
					<InputText
						v-model="searchValue"
						@keyup.enter="onSearch"
						placeholder="Keyword Search"
					/>

					<Button
						label="Search"
						icon="pi pi-search"
						@click="onSearch"
					/>
				</div>

				<MultiSelect
					v-model="showColumns"
					:options="columns"
					:maxSelectedLabels="0"
					optionLabel="name"
					placeholder="Select Columns"
				/>
			</div>
		</template>

		<template #empty> No customers found. </template>

		<Column
			field="name"
			header="Name"
			sortable
			:hidden="onHiddenColumn('name')"
			style="min-width: 14rem"
		>
			<template #body="{ data }">
				{{ data.name }}
			</template>
			<template #filter="{ filterModel }">
				<InputText
					v-model="filterModel.value"
					type="text"
					placeholder="Search by name"
				/>
			</template>
		</Column>

		<Column
			header="Country"
			sortable
			sortField="country.name"
			filterField="country.name"
			:hidden="onHiddenColumn('country')"
			style="min-width: 14rem"
		>
			<template #body="{ data }">
				<div>
					<img
						alt="flag"
						src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
						:class="`flag flag-${data.country.code}`"
						style="width: 24px"
					/>
					<span>{{ data.country.name }}</span>
				</div>
			</template>
		</Column>

		<Column
			header="Agent"
			sortable
			sortField="representative.name"
			filterField="representative"
			:showFilterMatchModes="false"
			:filterMenuStyle="{ width: '14rem' }"
			:hidden="onHiddenColumn('representative')"
			style="min-width: 14rem"
		>
			<template #body="{ data }">
				<div style="display: flex; align-items: center; gap: 10px">
					<img
						:alt="data.representative.name"
						:src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`"
						style="width: 32px"
					/>
					<span>{{ data.representative.name }}</span>
				</div>
			</template>
		</Column>

		<Column
			field="balance"
			header="Balance"
			sortable
			filterField="balance"
			dataType="numeric"
			:hidden="onHiddenColumn('balance')"
			style="min-width: 10rem"
		>
			<template #body="{ data }">
				{{ formatCurrency(data.balance) }}
			</template>
		</Column>

		<Column
			header="Status"
			field="status"
			sortable
			:filterMenuStyle="{ width: '14rem' }"
			:hidden="onHiddenColumn('status')"
			style="min-width: 12rem"
		>
			<template #body="{ data }">
				<Tag
					:value="data.status"
					:severity="getSeverity(data.status)"
				/>
			</template>
		</Column>
	</DataTable>
</template>

<style lang="scss" scoped>
	.table {
		&__head {
			display: grid;
			grid-template-columns: 1fr 20%;
			column-gap: 40px;
			justify-content: space-between;
		}

		&__search {
			display: flex;
			align-items: center;
			gap: 20px;

			width: 100%;

			& .p-inputtext {
				flex-grow: 1;
			}
		}
	}
</style>
