export function toggleDomNodeVisibilityOnScroll (container, node, initialNodeYPos) {
    const yPosKey = `__LAST_SCROLL_YPOS_${node.classList[0]}`
    const lastScrollNodeYPos = window[yPosKey] || 0

    if(container.scrollTop > 0 && Math.abs(container.scrollTop - lastScrollNodeYPos) > 10){
        if(container.scrollTop < lastScrollNodeYPos) node.style.top =  `${initialNodeYPos}px`
        else node.style.top = `-${node.scrollHeight}px`
    }
    window[yPosKey] = container.scrollTop
}