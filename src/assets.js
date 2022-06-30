const musicBtn = document.querySelector('.wrapper')
const audio = new Audio('audio/What_It_Is.mp3')

const playSound = () => {
    audio.play()
}

playSound()

musicBtn.addEventListener('click', () => {
    musicBtn.classList.toggle('active')
    
    if (musicBtn.classList.contains('active')) {
        audio.pause()
        
        return 
    }

    playSound() 
})

audio.addEventListener('ended', () => {
    audio.play()
})