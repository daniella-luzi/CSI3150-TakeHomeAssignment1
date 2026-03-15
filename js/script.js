/*calling filterCards when there is a change in a checkbox*/
document.querySelectorAll('.cb').forEach(checkbox => {
    checkbox.addEventListener('change', filterCards);});

/*resetting filters, showing all the cars, and unchecking all the boxes*/
function resetFilters() {
            document.querySelectorAll('.card').forEach(card => {
                card.style.display = 'block';});
            document.querySelectorAll('.cb').forEach(cb => {
                cb.checked = false;});
    }

function filterCards() {
    /*checking if make and color are checked*/
    const makeValues = document.querySelectorAll('#car-make-checkbox .cb:checked');
    const makeChecks = Array.from(makeValues).map(cb => cb.value);

    const colorValues = document.querySelectorAll('#color-checkbox .cb:checked')
    const colorChecks = Array.from(colorValues).map(cb => cb.value);
        
    /*checking if year, mileage, and price are checked*/
    const yearValues = document.querySelectorAll('#year-checkbox .cb:checked');
    const yearRanges = Array.from(yearValues).map(cb => {
        const min = cb.dataset.min;
        const max = cb.dataset.max;
        return { min, max }; });   
    
    const mileageValues = document.querySelectorAll('#mileage-checkbox .cb:checked');
    const mileageRanges = Array.from(mileageValues).map(cb => {
        const min = cb.dataset.min;
        const max = cb.dataset.max;
        return { min, max }; });
    
    const priceValues = document.querySelectorAll('#price-checkbox .cb:checked');
    const priceRanges = Array.from(priceValues).map(cb => {
        const min = cb.dataset.min;
        const max = cb.dataset.max;
        return { min, max }; });

    const cards = document.querySelectorAll('.card');
    let visibleCount = 0;

    cards.forEach(card => {
        /*getting data attributes from the cards*/
        const carMake = card.dataset.make;
        const carColor = card.dataset.color;
        const carYear = card.dataset.year;
        const carMileage = card.dataset.mileage;
        const carPrice = card.dataset.price;

        /*displaying all the cars first*/
        let showCard = true;

        /*if the make is selected, hide the cars that do not match. seeing if checkboxes are checked and seeing which car makes are not included*/
        if (makeChecks.length && !makeChecks.includes(carMake)) {
            showCard = false;
        }
        /*same concept for car colors*/
        if (colorChecks.length && !colorChecks.includes(carColor)) {
            showCard = false;
        }
        /*checking for year, mileage, and price. seeing if checkboxes are checked and seeing if it falls inside the range*/
        if (yearRanges.length) {
            const inRange = yearRanges.some(r => {
                if (r.min !== null && carYear < r.min) {
                    return false;
                } else if (r.max !== null && carYear > r.max) {
                    return false;
                } else {
                    return true;
                }
            });
            if (!inRange) showCard = false;
        }

          if (mileageRanges.length) {
            const inRange = mileageRanges.some(r => {
                if (r.min !== null && carMileage < r.min) { 
                    return false;
                } else if (r.max !== null && carMileage > r.max) {
                    return false;
                } else {
                    return true;
                }
            });
            if (!inRange) showCard = false;
        }
        if (priceRanges.length) {
            const inRange = priceRanges.some(r => {
                if (r.min !== null && carPrice < r.min) {
                    return false;
                } else if (r.max !== null && carPrice > r.max) {
                    return false;
                } else {
                    return true;
                }
            });
            if (!inRange) showCard = false;
        }

        card.style.display = showCard ? 'block' : 'none';
        if (showCard) visibleCount++;
    });

    /*displaying no results if no cars are shown*/
    const msg = document.getElementById('no-results-message');
    if (msg) {
        msg.style.display = visibleCount === 0 ? '' : 'none';
    }

}