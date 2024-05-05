// Делаем кнопки переключения валют инертными или наоборот
// Это нужно при подгрузке данных с сервера
function toggleButtonsInert(inert: boolean) {
    const buttons = Array.from(
        document.querySelectorAll(".cur-item"),
    ) as HTMLElement[];
    const dropdown = document.querySelector(".dropdown") as HTMLElement;

    if (inert) {
        buttons.forEach((btn) => (btn.inert = true));
        dropdown.inert = true;
        return;
    }

    buttons.forEach((btn) => (btn.inert = false));
    dropdown.inert = false;
}

export { toggleButtonsInert }