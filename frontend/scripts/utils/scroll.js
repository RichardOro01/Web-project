const scrollToId = (id) => {
    const header = document.getElementById("header")
    const element = document.getElementById(id);
		if (element) {
			window.scrollTo({
				behavior: 'smooth',
				top: element.offsetTop - (header?.clientHeight ?? 0),
			});
		}
}