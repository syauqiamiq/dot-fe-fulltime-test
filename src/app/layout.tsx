"use client";

import { store } from "@stores/store";
import { Layout } from "antd";
import { useRouter } from "next/navigation";
import { Provider } from "react-redux";
import "./globals.css";
const { Header, Content, Footer } = Layout;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const router = useRouter();
	return (
		<html lang="en">
			<body>
				<Provider store={store}>
					<Layout>
						<Header
							style={{
								width: "100%",
							}}
							className="flex w-full items-center justify-between"
						>
							<h1 className="text-white font-poppins font-bold text-2xl">
								CEK ONGKIR KUY
							</h1>
						</Header>
						{children}
						<Footer style={{ textAlign: "center" }}>
							Frontend Developer Test for DOT ©{new Date().getFullYear()}{" "}
							Created by Muhammad Syauqi Amiq Amrullah
						</Footer>
					</Layout>
				</Provider>
			</body>
		</html>
	);
}
