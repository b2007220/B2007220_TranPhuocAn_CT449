<template>
	<v-app>
		<NavBar />
		<v-main>
			<v-container>
				<v-card class="mar-top" flat>
					<v-container fluid>
						<v-row>
							<v-col cols="12" sm="7">
								<v-carousel>
									<v-carousel-item
										src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
										cover
									></v-carousel-item>

									<v-carousel-item
										src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
										cover
									></v-carousel-item>

									<v-carousel-item
										src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
										cover
									></v-carousel-item>
								</v-carousel>
							</v-col>
							<v-col cols="12" sm="5">
								<v-app-bar-title>Thông tin sản phẩm</v-app-bar-title>
								<v-card-title>Card Title</v-card-title>
								<v-card-subtitle>Subtitle</v-card-subtitle>
								<v-card-text>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
								</v-card-text>
								<v-chip color="green" outlined text-color="black" small>
									<v-btn  x-small prepend-icon="fas fa-plus"></v-btn>
									<v-divider vertical inset class="mr-1"></v-divider>
									1
									<v-divider vertical inset class="ml-1"></v-divider>
									<v-btn  x-small prepend-icon="fas fa-minus"></v-btn>
								</v-chip>
							</v-col>
						</v-row>
					</v-container>
				</v-card>
			</v-container>
		</v-main>
		<Footer />
	</v-app>
</template>

<script setup>
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
</script>
<script>
export default {
	data: () => ({
		tab: null,
		r1: 4,
		r2: 3,
		r3: 2,
		slider2: 50,

		ex4: [
			'red',
			'indigo',
			'orange',
			'primary',
			'secondary',
			'success',
			'info',
			'warning',
			'error',
			'red darken-3',
			'indigo darken-3',
			'orange darken-3',
		],
		ex5: [
			'red',
			'indigo',
			'orange',
			'primary',
			'secondary',
			'success',
			'info',
			'warning',
			'error',
			'red darken-3',
			'indigo darken-3',
			'orange darken-3',
		],
	}),
};
</script>
<style scoped>
.mar-top {
	margin-top: 250px;
}
</style>
