"use client";

import React, {useEffect, useState} from 'react';
import ConfirmDialog from "@/app/components/ConfirmDialog";
import "./Confirm.style.scss"
import Image from "next/image";

export default function ConfirmPageWrapper() {
	const [isFormFilled, setIsFormFilled] = useState(false);

	useEffect(() => {
		const filled = localStorage.getItem("filled");
		setIsFormFilled(filled === "true");
	}, []);

	const handleSuccess = () => {
		setIsFormFilled(true);
	};

	return (
		<div>
			{isFormFilled ?
				<div className={'content-wrapper pt-12'}>
					<h5>Malo iznenađence dok učite 😀</h5>
					<div className="flex flex-col items-start justify-start">
						<Image src={"/perica.png"} alt={"Perica"} width={300} height={300}/>
						<h4 className={'bg-white w-full px-2 py-4'}>Taša, Perica i Peca</h4>
					</div>
				</div> :
				<ConfirmDialog onSuccess={handleSuccess}/>}
		</div>
	);
}