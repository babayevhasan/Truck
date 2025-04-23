import { useEffect, useState } from 'react'

export const useWindowWidth = (callbackFn) => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);



	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth)
			callbackFn(window.innerWidth)
		}

		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, []);

	return {windowWidth, setWindowWidth}
}