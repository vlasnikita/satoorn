import React, {Component} from 'react';

let lastHoveredBlockNumber = 2

class Mario extends Component {

    componentDidMount() {
        document.querySelectorAll('.Level__block_button').forEach(block => {
            block.addEventListener('mouseover', function (e) {
                // получаем марио
                const mario = document.querySelector('.mario')

                // понимаем куда перемещать
                const blockNumber = this.getAttribute('data-number')
                let reposition
                if (blockNumber == 1) reposition = '-102px'
                else if (blockNumber == 2) reposition = '-34px'
                else if (blockNumber == 3) reposition = '34px'
                else if (blockNumber == 4) reposition = '102px'

                // понимаем куда разворачивать иконку
                let mirror
                if ((+lastHoveredBlockNumber) - (+blockNumber) >= 0) mirror = '-1'
                else mirror = '1'


                // применяем стили
                mario.style.left = 'calc(50% + ' + reposition + ')'
                if (lastHoveredBlockNumber != blockNumber) mario.style.transform = `translateX(-50%) scaleX(${mirror})`

                // меняем последний блок, чтобы в случае реховера в процессе анимации всё работало
                lastHoveredBlockNumber = blockNumber

                // применяем анимации
                TweenLite.to(".mario__base", .5, {morphSVG: ".mario__run"});
                setTimeout(() => {
                    TweenLite.to(".mario__base", .5, {morphSVG: ".mario__idle"});
                }, 500)
            }, true)

            block.addEventListener('click', function () {
                // получаем марио
                const mario = document.querySelector('.mario')

                // применяем стили
                mario.style.bottom = 'calc(41px + 82px)'
            })
        })
    }

    getReposition = blockNumber => {
        if (blockNumber === 1) return '-102px'
        else if (blockNumber === 2) return '-34px'
        else if (blockNumber === 3) return '34px'
        else if (blockNumber === 4) return '102px'
    }

    render() {
        return (
            <div className="mario">
                <svg id="mario__svg" width="18" height="24" viewBox="5.616 0.351 72.726 95.55"
                     xmlns="http://www.w3.org/2000/svg">
                    <path className="mario__base mario-color"
                          d="
                        M24 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zM18 6h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M18 12h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M36 12h6v6h-6zm6 0h6v6h-6z
                        M48 12h6v6h-6z
                        M54 12h6v6h-6z
                        M12 18h6v6h-6z
                        M18 18h6v6h-6z
                        M24 18h6v6h-6z
                        M30 18h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M48 18h6v6h-6z
                        M54 18h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M12 24h6v6h-6z
                        M18 24h6v6h-6z
                        M24 24h6v6h-6zm6 0h6v6h-6z
                        M36 24h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M54 24h6v6h-6z
                        M60 24h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M12 30h6v6h-6zm6 0h6v6h-6z
                        M24 30h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M48 30h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm-54 0h6v6h-6zm6 0h6v6h-6z
                        M24 30h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M48 30h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M24 36h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M18 42h6v6h-6zm6 0h6v6h-6z
                        M30 42h6v6h-6z
                        M36 42h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm-36 6h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M30 48h6v6h-6z
                        M36 48h6v6h-6zm6 0h6v6h-6z
                        M48 48h6v6h-6z
                        M54 48h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zM6 54h6v6H6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M30 54h6v6h-6z
                        M36 54h6v6h-6zm6 0h6v6h-6z
                        M48 54h6v6h-6z
                        M54 54h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M6 60h6v6H6zm6 0h6v6h-6z
                        M18 60h6v6h-6zm6 0h6v6h-6z
                        M30 60h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M54 60h6v6h-6zm6 0h6v6h-6z
                        M66 60h6v6h-6zm6 0h6v6h-6zM6 66h6v6H6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M24 66h6v6h-6z
                        M30 66h6v6h-6z
                        M36 66h6v6h-6zm6 0h6v6h-6z
                        M48 66h6v6h-6z
                        M54 66h6v6h-6z
                        M60 66h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zM6 72h6v6H6zm6 0h6v6h-6z
                        M18 72h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M66 72h6v6h-6zm6 0h6v6h-6z
                        M18 78h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm18 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M12 84h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm30 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zM6 90h6v6H6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm30 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        "/>
                    <path style={{visibility: 'hidden'}} className="mario__idle mario-red"
                          d="
                        M24 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zM18 6h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M18 12h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M36 12h6v6h-6zm6 0h6v6h-6z
                        M48 12h6v6h-6z
                        M54 12h6v6h-6z
                        M12 18h6v6h-6z
                        M18 18h6v6h-6z
                        M24 18h6v6h-6z
                        M30 18h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M48 18h6v6h-6z
                        M54 18h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M12 24h6v6h-6z
                        M18 24h6v6h-6z
                        M24 24h6v6h-6zm6 0h6v6h-6z
                        M36 24h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M54 24h6v6h-6z
                        M60 24h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M12 30h6v6h-6zm6 0h6v6h-6z
                        M24 30h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M48 30h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm-54 0h6v6h-6zm6 0h6v6h-6z
                        M24 30h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M48 30h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M24 36h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M18 42h6v6h-6zm6 0h6v6h-6z
                        M30 42h6v6h-6z
                        M36 42h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm-36 6h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M30 48h6v6h-6z
                        M36 48h6v6h-6zm6 0h6v6h-6z
                        M48 48h6v6h-6z
                        M54 48h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zM6 54h6v6H6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M30 54h6v6h-6z
                        M36 54h6v6h-6zm6 0h6v6h-6z
                        M48 54h6v6h-6z
                        M54 54h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M6 60h6v6H6zm6 0h6v6h-6z
                        M18 60h6v6h-6zm6 0h6v6h-6z
                        M30 60h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M54 60h6v6h-6zm6 0h6v6h-6z
                        M66 60h6v6h-6zm6 0h6v6h-6zM6 66h6v6H6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M24 66h6v6h-6z
                        M30 66h6v6h-6z
                        M36 66h6v6h-6zm6 0h6v6h-6z
                        M48 66h6v6h-6z
                        M54 66h6v6h-6z
                        M60 66h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zM6 72h6v6H6zm6 0h6v6h-6z
                        M18 72h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M66 72h6v6h-6zm6 0h6v6h-6z
                        M18 78h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm18 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        M12 84h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm30 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zM6 90h6v6H6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm30 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
                        "/>
                    <path style={{visibility: 'hidden'}} className="mario__run mario-red" d="
    M24 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zM18 6h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
M18 12h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
M36 12h6v6h-6zm6 0h6v6h-6z
M48 12h6v6h-6z
M54 12h6v6h-6z
M12 18h6v6h-6z
M18 18h6v6h-6z
M24 18h6v6h-6z
M30 18h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
M48 18h6v6h-6z
M54 18h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
M12 24h6v6h-6z
M18 24h6v6h-6z
M24 24h6v6h-6zm6 0h6v6h-6z
M36 24h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
M54 24h6v6h-6z
M60 24h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
M12 30h6v6h-6zm6 0h6v6h-6z
M24 30h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
M48 30h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm-54 0h6v6h-6zm6 0h6v6h-6z
M24 30h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
M48 30h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
M24 36h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
M18 42h6v6h-6zm6 0h6v6h-6z
M30 42h6v6h-6z
M36 42h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm-36 6h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
M30 48h6v6h-6z
M36 48h6v6h-6zm6 0h6v6h-6z
M48 48h6v6h-6zM54 48h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zM6 54h6v6H6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
M30 54h6v6h-6z
M36 54h6v6h-6zm6 0h6v6h-6z
M48 54h6v6h-6z
M54,54h6v6h-6ZM60,54h6v6h-6ZM66,41.82155484987473h6v18.17844515012527h-6ZM71.99999999999997,41.936445841857044h6.000000000000028v18.063554158142956h-6Z
M0.6001233768312417,59.88510900801769h11.399876623168758v6.114890991982307h-11.399876623168758ZM12,60h6v6h-6Z
M18 60h6v6h-6zm6 0h6v6h-6z
M30 60h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6zm6 0h6v6h-6z
M54 60h6v6h-6zm6 0h6v6h-6z
M66,60h6v6h-6ZM72,60h6v-0.0892225750626423h-6ZM0.6001233768312628,66h11.399876623168737v6h-11.39987662316873ZM12,66h6v6h-6ZM18,66h6v6h-6Z
M24 66h6v6h-6z
M30 66h6v6h-6z
M36 66h6v6h-6zm6 0h6v6h-6z
M48 66h6v6h-6z
M54 66h6v6h-6z
M60,66h6v6h-6ZM66,66h5.885109008017679v-6.0635541581429635h-5.885109008017679ZM72.45956396792926,59.79588643295504h5.540436032070772v0.02566841691968591h-5.310654048106159ZM6,72h6v6h-6ZM12,78.43389555100957h6v-6.580563622063366h-6Z
M18,72h6v6h-6ZM24,72h6v6h-6ZM30,72h6v6h-6ZM36,72h6v6h-6ZM42,72h6v6h-6ZM48,72h6v6h-6ZM54,72h6v6h-6ZM60,72h6v6h-6Z
M66,66.02566841691969h6v0.2554504008843139h-6ZM71.77021801603539,65.91077742493736h-5.948663166160685v-1.6976964628150597h-0.1405594089019928Z
M18,78h5.5404360320707475v6h-5.5404360320707475ZM19.05968734476052,77.42554504008844h24.26766772518789v18.523118126072205h-24.49744970915252ZM29.770218016035372,77.65532702405305h22.774084829417816v12.20411356704497h-22.607857003596155ZM37.77470171357406,77.0808720641415h16.22529828642594v6.919127935858498h-16.55652016975681ZM54,78h6v6h-6ZM60,78h6v6h-6Z
M10.2766351202653,77.91077742493736h8.068037855681652v11.974331583080328h-8.068037855681652ZM16.2766351202653,83.54043603207074h6v6h-6ZM22.2766351202653,83.54043603207074h-0.08922257506263875v6h0.08922257506263875ZM52.2766351202653,83.8851090080177h6v5.655327024053051h-6ZM58.2766351202653,83.54043603207074h6v5.912166821448167h-6ZM62.20859726458365,77.56610444899043h10.250966703345604v12.185935404628367h-8.182928847663959ZM4.161744128282992,83.4512134570081h6.114890991982316v12.08922257506265h-6.000000000000009ZM9.242616192424467,83.5661044489904h7.263800911805461v5.8851090080177215h-7.263800911805433ZM16.2766351202653,89.65532702405307h6v0.1405594089019644h-6.114890991982307ZM22.2766351202653,89.48299053607958h-0.31900455902726677v0.42778688885775296h-16.62741675836403ZM52.2766351202653,89.54043603207074h6v0.2554504008843139h-6ZM58.3915261122476,83.45121345700811h5.8851090080177v6.315395249763014h-6.004439825506971ZM64.04685313630067,83.45121345700811h6.229781983964628v0.0256684169196717h-6.344672975946935ZM72,71.38765929886512h6.45956396792927v18.440555289269994h-6.344672975946949Z
"/>
                </svg>
            </div>
        );
    }
}

export default Mario;