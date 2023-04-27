export const formatPrice = (price) => {
    return `$${(price / 100).toFixed(2)}`;
  };
  
  export const formatRating = (rating) => {
    return `${rating.toFixed(1)}/5.0`;
  };
  
  export const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  
  export const formatDateTime = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  