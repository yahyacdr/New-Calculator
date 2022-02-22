let buttons = document.querySelectorAll('.button div div')
let switcher = document.querySelector('.switcher')
let darkLight = document.querySelector('.switcher img')
let inputField = document.querySelector('.input-field')
let backspace = document.querySelector('.backspace img')
let buttonNums = document.querySelectorAll('.button div:nth-child(n + 2):nth-child(-n + 5) div:nth-child(n + 1):nth-child(-n + 3)')
let dot = document.querySelector('.button div:nth-child(5) span')
let result = document.querySelector('.result')
let calc = document.querySelector('.button')
let space = '\240'
let nums = []
let a = 0
let equalClick = 0
let equalClick1 = 0
let j
let op = ''
let neg = '-'

buttons.forEach(function(button){

    button.addEventListener('click', function(e){

        if (e.target.innerText !== '=' 
        && e.target.innerText !== 'AC' 
        && e.target.className !== 'backspace'
        && e.target.innerText !== '+/-'
        ){

            if (Number.isNaN(parseFloat(e.target.innerText)) && e.target.innerText !== '.'){

                result.value = op
                let rl = result.value.length

                if (Number.isNaN(parseFloat(result.value[rl - 2])) 
                && result.value[rl - 2] !== ' '
                && typeof result.value[rl - 2] !== 'undefined'
                && result.value[rl - 2] !== '.') {

                    result.value = result.value.split('')
                    .map((ele,i) => i > (rl - 4) ? '' : ele).join('')

                    op = op.split('')
                    .map((ele,i) => i > (rl - 4) ? '' : ele).join('')
                    
                }

                result.value += ' ' + e.target.innerText + ' '
                op += ' ' + e.target.innerText + ' '
                inputField.value = ''
                equalClick = equalClick1 = 0

            } else {

                if (equalClick === 0 || equalClick1 > 0) {

                    if (e.target.innerText === '.') {

                        let i = inputField.value.length
                        let opl = op.length
                        let cd = op.slice(opl - i, opl)
                        cd.split('').includes('.') ? '' :
                        op += e.target.innerText
                        
                        inputField.value.split('').includes('.') ? '' :
                        inputField.value += e.target.innerText

                    } else {

                        inputField.value += e.target.innerText
                        op += e.target.innerText

                    }
                    

                } else {

                    inputField.value = ''
                    op = ''
                    e.target.innerText === '.' ?
                    inputField.value = op = '0' : ''
                    inputField.value += e.target.innerText
                    op += e.target.innerText
                    equalClick1++

                }

            }

        } else if (e.target.className === 'backspace'){

            if (inputField.value === '') {

                if (Number.isNaN(parseFloat(result.value[result.value.length - 2])) 
                && result.value[result.value.length - 2] !== ' '
                && typeof result.value[result.value.length - 2] !== 'undefined'
                && result.value[result.value.length - 2] !== '.') {
                    op = op.slice(0, -3)
                    result.value = result.value.slice(0, -3)
                } else {
                    op = op.slice(0, -1)
                    result.value = result.value.slice(0, -1)
                }
                
            } else {

                inputField.value = inputField.value.slice(0, -1)
                op = op.slice(0 , -1)

            }

        } else if (e.target.innerText === '+/-') {

            inputField.value.length > 0 ?
            inputField.value = '-' + inputField.value : ''
            if (op.length > 1){
 
                op = '-' + op

            } else if (op.length === 1) {
                neg += op
                op = neg
                neg = '-'
            }
            

        } else if (e.target.innerText === '='){
            
            if (Number.isNaN(parseFloat(op[op.length - 2])) 
            && op[op.length - 2] !== ' '
            && op[op.length - 2] !== '-'
            && op.length > 1){

                op += '0'

            }

            typeof op === 'string' ? op.trim() : ''
            typeof op === 'string' ? nums = op.split(' ') : nums = op
            let o = 0;

            while(o < nums.length){

                if (nums[o] === '\327'){

                    j = o
                    a = parseFloat(nums[j-=1])*parseFloat(nums[j+=2])
                    nums[j] = a

                    for (let s = 0; s < 2; s++){
                        nums.splice(--j, 1)
                    }

                    o = 0
                }

                if (nums[o] === '\367'){

                    j = o
                    a = parseFloat(nums[j-=1])/parseFloat(nums[j+=2])
                    nums[j] = a

                    for (let s = 0; s < 2; s++){
                        nums.splice(--j, 1)
                    }

                    o = 0
                }

                if (nums[o] === '^') {

                    j = o
                    a = Math.pow(parseFloat(nums[j-=1]), parseFloat(nums[j+=2]))
                    nums[j] = a

                    for (let s = 0; s < 2; s++) {
                        nums.splice(--j, 1)
                    }

                    o = 0
                }

                o++
            }

            for (let i = 0; i < nums.length; i++){

                j = i

                if (nums[i] === '+'){

                    a = parseFloat(nums[j-=1])+parseFloat(nums[j+=2])
                    nums[j] = a

                    for (let s = 0; s < 2; s++){
                        nums.splice(--j, 1)
                    }

                    i = 0
                }

                if (nums[i] === '-'){

                    a = parseFloat(nums[j-=1])-parseFloat(nums[j+=2])
                    nums[j] = a

                    for (let s = 0; s < 2; s++){
                        nums.splice(--j, 1)
                    }

                    i = 0
                }
            }

            if (Number.isNaN(nums[0])) {

                result.value = ''
                inputField.value = 'Invalid input'

            } else {

                nums.length > 0 && equalClick === 0? 
                result.value +=  inputField.value + ' ' + '=' : ''
                op.split('').filter(ele => ele !== '+'
                || ele !== '-'
                || ele !== '\327'
                || ele !== '367' ?
                result.value = op + ' ' + '=' : '')
                op = ''
                op = nums
                nums.length > 0 ? inputField.value = nums : ''
                nums = []
                equalClick++

            }
            
        }

        if (e.target.innerText === 'AC'){
            inputField.value = ''
            result.value = ''
            op = ''
            equalclick = 0
            equalclick1 = 0
        }
})})

a = 0

darkLight.onclick = function() {

    a++

    if ((a%2) !== 0){

        darkLight.classList.remove('sliderToRight-img')
        darkLight.classList.add('slideToLeft-img')
        setTimeout(function(){
            darkLight.src = 'img/sun(1).png'
        }, 800)

        switcher.style.backgroundColor = '#f0f0f0'
        document.body.style.backgroundColor = '#ffffff'
        inputField.style.backgroundColor = '#ffffff'
        inputField.style.color = '#22252d'
        result.style.backgroundColor = '#ffffff'
        result.style.color = '#22252d'
        calc.style.backgroundColor = '#f0f0f0'
        buttons.forEach((button) => button.style.backgroundColor = '#dfdfdf')
        buttons.forEach((button) => button.style.boxShadow = 'none') 
        buttonNums.forEach((num) => num.style.color = '#3e4044')
        dot.style.color = '#3e4044'
        backspace.style.filter = 'invert(22%)'

    } else {

        darkLight.classList.remove('sliderToLeft-img')
        darkLight.classList.add('sliderToRight-img')

        setTimeout(function(){
            darkLight.src = 'img/night-mode.png'
        }, 800)

        switcher.style.backgroundColor = '#2a2d37'
        document.body.style.backgroundColor = '#22252d'
        inputField.style.backgroundColor = '#22252d'
        inputField.style.color = '#ffffff'
        result.style.backgroundColor = '#22252d'
        result.style.color = '#ffffff'
        calc.style.backgroundColor = '#2a2d37'
        buttons.forEach((button) => button.style.backgroundColor = '#262a2f')
        buttons.forEach((button) => button.style.boxShadow = '0px 0px 2px 0px #24272c') 
        buttonNums.forEach((num) => num.style.color = 'white')
        dot.style.color = 'white'
        backspace.style.filter = 'invert(100%)'
    }
}
