import React from "react";
import HeroFull from "../components/sections/HeroFull02";
import Testimonial from "../components/sections/Testimonial";
import GenericSection from "../components/sections/GenericSection";
import { api } from "../utils/client";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { useLocation, Link } from "react-router-dom";

function useQueryParams() {
	const { search } = useLocation();

	return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Products = () => {
	let query = useQueryParams();

	let prodLink = query.get("link");

	const { data, isLoading, isError } = useQuery(
		`productdetail?url=${prodLink}`,
		() => api.get(`productdetail?url=${prodLink}`),
		{ refetchOnMount: false }
	);

	const verifPrice = (priceObj) => {
		const neededKeys = ["image", "link", "market", "price", "title"];

		let verify = neededKeys.every((key) =>
			Object.keys(priceObj).includes(key)
		);

		return verify;
	};

	const parsePrice = (priceMixed) => {
		let [price, date] = priceMixed.split("DT");

		return { price: `${price} DT`, date: date.replace("*", "") };
	};

	return (
		<React.Fragment>
			<GenericSection topDivider>
				{isLoading ? (
					<div className="container px-5 py-2 mx-auto">
						<div class="flex items-center justify-center space-x-2">
							<svg
								role="status"
								class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
								viewBox="0 0 100 101"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
									fill="currentColor"
								/>
								<path
									d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
									fill="currentFill"
								/>
							</svg>
						</div>
						<div className="flex items-center justify-center space-x-2 py-24 text-gray-500">
							We're fetching product details, Please wait ....
						</div>
					</div>
				) : (
					<div className="container px-5 py-2 mx-auto">
						<div className="lg:w-4/5 mx-auto flex flex-wrap">
							<img
								alt="ecommerce"
								className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
								src={data?.cover}
							/>
							<div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
								<h2 className="text-sm title-font text-gray-500 tracking-widest">
									{data?.marque.trim()}
								</h2>
								<h1 className="text-white text-3xl title-font font-medium mb-1">
									{data?.title}
								</h1>
								<div className="flex mb-4">
									<span className="flex items-center">
										<svg
											fill="currentColor"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											className="w-4 h-4 text-indigo-400"
											viewBox="0 0 24 24"
										>
											<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
										</svg>
										<svg
											fill="currentColor"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											className="w-4 h-4 text-indigo-400"
											viewBox="0 0 24 24"
										>
											<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
										</svg>
										<svg
											fill="currentColor"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											className="w-4 h-4 text-indigo-400"
											viewBox="0 0 24 24"
										>
											<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
										</svg>
										<svg
											fill="currentColor"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											className="w-4 h-4 text-indigo-400"
											viewBox="0 0 24 24"
										>
											<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
										</svg>
										<svg
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											className="w-4 h-4 text-indigo-400"
											viewBox="0 0 24 24"
										>
											<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
										</svg>
										<span className="ml-3">4 Reviews</span>
									</span>
									<span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-800 text-gray-500 space-x-2">
										<a>
											<svg
												fill="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												className="w-5 h-5"
												viewBox="0 0 24 24"
											>
												<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
											</svg>
										</a>
										<a>
											<svg
												fill="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												className="w-5 h-5"
												viewBox="0 0 24 24"
											>
												<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
											</svg>
										</a>
										<a>
											<svg
												fill="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												className="w-5 h-5"
												viewBox="0 0 24 24"
											>
												<path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
											</svg>
										</a>
									</span>
								</div>
								<p className="leading-relaxed">
									{data?.category}
								</p>
								<div className="flex">
									<span className="title-font font-medium text-2xl text-white">
										{data?.price}
									</span>
									<button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
										Button
									</button>
									<button className="rounded-full w-10 h-10 bg-gray-800 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
										<svg
											fill="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											className="w-5 h-5"
											viewBox="0 0 24 24"
										>
											<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
										</svg>
									</button>
								</div>
							</div>
						</div>
						<div className="flex flex-col text-center w-full mb-20">
							<h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
								Pricing
							</h1>
							<p className="lg:w-2/3 mx-auto leading-relaxed text-base">
								{data?.shortDesc}
							</p>
						</div>
						<div className="lg:w-2/3 w-full mx-auto overflow-auto">
							<table className="table-auto w-full text-left whitespace-no-wrap">
								<thead>
									<tr>
										<th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 rounded-tl rounded-bl">
											Title
										</th>
										<th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
											Market
										</th>
										<th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
											Date
										</th>
										<th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
											Price
										</th>
									</tr>
								</thead>
								<tbody>
									{data &&
										data.prices_table?.map((price, key) => {
											if (verifPrice(price)) {
												let parsedPriceDate =
													parsePrice(price.price);
												return (
													<tr key={key}>
														<td className="border-t-2 border-gray-800 px-4 py-3">
															{price.title}
														</td>
														<td className="border-t-2 border-gray-800 px-4 py-3">
															<a
																href={
																	price.link
																}
																target="_blank"
															>
																<img
																	className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0"
																	src={
																		price.market
																	}
																/>
															</a>
														</td>
														<td className="border-t-2 border-gray-800 px-4 py-3">
															{
																parsedPriceDate.date
															}
														</td>
														<td className="border-t-2 border-gray-800 px-4 py-3 text-lg text-white">
															{
																parsedPriceDate.price
															}
														</td>
													</tr>
												);
											}
										})}
								</tbody>
							</table>
						</div>
					</div>
				)}
			</GenericSection>
		</React.Fragment>
	);
};
export default Products;
