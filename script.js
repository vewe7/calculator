function operate(a, b, operator) {
    if (operator == '+') {
        return a + b;
    } else if (operator == '-') {
        return a - b;
    } else if (operator == '*') {
        return a * b;
    } else if (operator == '/') {
        if (b == 0)
            return 'Error';
        return a / b;
    }
    return 'Error';
}