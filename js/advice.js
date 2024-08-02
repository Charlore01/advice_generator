const adviceNumber = document.getElementById('adviceNumber');

        const adviceText = document.getElementById('adviceText');

        const newAdviceBtn = document.getElementById('newAdviceBtn');

        const twitterShareBtn = document.getElementById('twitterShareBtn');

        const facebookShareBtn = document.getElementById('facebookShareBtn');

        let currentAdvice = '';


        function setLoading(isLoading) {
            newAdviceBtn.classList.toggle('loading', isLoading);
            newAdviceBtn.disabled = isLoading;
        }


        function fadeOut(element) {
            element.style.opacity = '0';
        }


        function fadeIn(element) {
            element.style.opacity = '1';
        }


        async function getAdvice() {
            setLoading(true);
            fadeOut(adviceNumber);
            fadeOut(adviceText);

            try {
                const response = await fetch('https://api.adviceslip.com/advice');
                const data = await response.json();
                
                setTimeout(() => {
                    adviceNumber.textContent = `Advice #${data.slip.id}`;
                    adviceText.textContent = `"${data.slip.advice}"`;
                    currentAdvice = data.slip.advice;
                    
                    fadeIn(adviceNumber);
                    fadeIn(adviceText);
                    setLoading(false);

                    // Save to local storage
                    localStorage.setItem('lastAdvice', JSON.stringify(data.slip));
                }, 300);
            } catch (error) {
                console.error('Error fetching advice:', error);
                adviceText.textContent = 'An error occurred while fetching advice. Please try again.';
                setLoading(false);
                fadeIn(adviceText);
            }
        }


        newAdviceBtn.addEventListener('click', getAdvice);
        twitterShareBtn.addEventListener('click', shareOnTwitter);
        facebookShareBtn.addEventListener('click', shareOnFacebook);

        // Load last advice from local storage or get new advice
        const lastAdvice = JSON.parse(localStorage.getItem('lastAdvice'));
        if (lastAdvice) {
            adviceNumber.textContent = `Advice #${lastAdvice.id}`;
            adviceText.textContent = `"${lastAdvice.advice}"`;
            currentAdvice = lastAdvice.advice;
        } else {
            getAdvice();
        }


              // function shareOnTwitter() {
        //     const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(currentAdvice)}`;
        //     window.open(twitterUrl, '_blank');
        // }


        // function shareOnFacebook() {
        //     const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(currentAdvice)}`;
        //     window.open(facebookUrl, '_blank');
        // }
