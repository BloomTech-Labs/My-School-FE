module.exports = function validateTitle(value) {
    let error;
    if (!value || value.length === 0) {
        error = "A title is required";
    } else if (value.length < 3)  {
        error = "Title must be at least 3 characters long";
    }
    return error || true;
}