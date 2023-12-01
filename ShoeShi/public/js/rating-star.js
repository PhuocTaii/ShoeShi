function rate(event) {
    const element = event.currentTarget;
    const stars = element.querySelectorAll('span');
    stars.forEach((star, index) => {
        star.addEventListener('mouseenter', () => {
            resetStars(stars);
            highlightStars(stars, index + 1);
        });

        star.addEventListener('mouseleave', () => {
            resetStars(stars);
            const rating = element.getAttribute('data-rating');
            if (rating) {
                highlightStars(stars, parseInt(rating));
            }
        });

        star.addEventListener('click', () => {
            const rating = index + 1;
            element.setAttribute('data-rating', rating);
            console.log(rating);
        });
    });
}

function resetStars(stars) {
    stars.forEach(star => {
        star.style.color = '#ccc';
    });
}

function highlightStars(stars, count) {
    for (let i = 0; i < count; i++) {
        stars[i].style.color = '#000';
    }
}