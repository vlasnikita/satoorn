export function clickOnPaymentMethodButton(wrapper, buttonText) {
    return wrapper.findWhere(node => (
        node.type() == 'p'
        &&
        node.text() == buttonText
    )).simulate('click');
}