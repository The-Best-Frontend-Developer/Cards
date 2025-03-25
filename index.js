const card = document.querySelectorAll('.card')
// теперь в переменной card хранятся все элементы в селектором .card

const maxRotation = 40
// в переменную выше я занес максимальное значение угла поворота. Можно хоть 180 сделать. Но думаю, что 40 идеально

// одной строчкой ниже forEach идет (итерируется) по каждой карточке. Так как мы взяли в переменную card несколько карточек, то это теперь массив, где каждый элемент есть каждой из карточек. Поэтому forEach проходит (итерируется) по каждому элементу, выполняя код внутри. А внутри будем вешать события (клик, вхождение мыши в элемент, выхождение из элемента, движение мыши в элементе).

card.forEach((el) => {

    //Теперь мы внутри действий на каждую из карточек. Строкой ниже addEventListener добавляет событие, на которое реагирует элемент. Оно называется 'mousemove', то есть движение мыши. Если мышь двигается по элементу, то выполняется код внутри

    el.addEventListener('mousemove', (event) => {
        // на каждое движение внутри элемента:

        const rect = el.getBoundingClientRect();
        // rect вычисляет все об элементе с помощью функции getBoundingClientRect(). el это конкретный элемент, мы же перечисляем их, а el получается конкретный.

        const elementWidth = rect.width;
        const elementHeight = rect.height;
        // две переменные получают от всех данных об элементе, содержащихся в rect, только ширину (.width) и высоту (.height)

        const mouseX = event.clientX - rect.left - elementWidth / 2;
        const mouseY = event.clientY - rect.top - elementHeight / 2;
        // теперь вычисления две строки выше вычисляют положение мыши относительно центра. Рассмотрим первую из них. event.clientX - положение мыши (Х и У), rect.left - из всех данных об элементе мы берем left - это положение левого края. ElementWidth / 2 - это ширина элемента поделить на 2, то есть половина от ширины элемента. Получается левый край минус середина элемента, будет найден X центр. А положение мыши минус центр будет положение мыши относительно центра. Если меньше 0, то левее, если больше 0, то правее центра.

        const relativeX = (mouseX / (elementWidth / 2));
        const relativeY = (mouseY / (elementHeight / 2));
        // приводим значения от -1 до 1. -1 по Х будет левый край, 1 по Х правый край. И значение между.

        const rotationY = -relativeX * maxRotation; // Вращение по оси Y
        const rotationX = relativeY * maxRotation;  // Вращение по оси X
        // Теперь, умножив значение от -1 до 1, включая дроби конечно же, получаем угол вращения. Чем дальше было положение мыши от центра, тем больше было значение, тем больше при умножении на максимальный угол вращения получилось значение поворота

        // Применяем вращение к элементу. el - данный элемент, style - доступ к его стилям, а дальше можно что угодно выбрать, но мы выбираем transform и через равно прописываем, что применим к стилям по вращению.
        el.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    })
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'rotateX(0deg) rotateY(0deg)';
    })
    // когда мышь покидает элемент (mouseleave), то ставим вращение на ноль, как было изначально
})
