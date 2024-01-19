import React,{useState} from 'react';
import StarRating from 'react-native-star-rating';

const CustomStarRating = ({ initialRating, onRatingChange }) => {
    const [rating, setRating] = useState(initialRating);
    const handleStarPress = (selectedRating) => {
        if (rating === selectedRating) {
          setRating(0);
          onRatingChange(0); 
        } else {
          setRating(selectedRating);
          onRatingChange(selectedRating);
        }
      };
  return (
    <StarRating
      disabled={false}
      maxStars={5}
      rating={rating}
      fullStarColor="gold" // You can customize the star color
      emptyStarColor="gray"
      starSize={18} // You can adjust the star size
      selectedStar={handleStarPress}
    />
  );
};

export default CustomStarRating;
