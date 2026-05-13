const localDatabase = {
    "Science": {
      "Space": "החלל החיצון הוא המרחב הנמצא מעבר לאטמוספירה של כדור הארץ. הוא כולל כוכבים, גלקסיות וחורים שחורים.",
      "Biology": "ביולוגיה היא חקר החיים. היא עוסקת במבנה, בתפקוד ובצמיחה של יצורים חיים."
    },
    "History": {
      "Ancient Egypt": "מצרים העתיקה הייתה ציוויליזציה שהתפתחה לאורך נהר הנילוס, המפורסמת בזכות הפירמידות והפרעונים.",
      "World War II": "מלחמת העולם השנייה הייתה המלחמה הגדולה והקטלנית ביותר בהיסטוריה האנושית (1939-1945)."
    }
  };
  
  exports.generateLearningContent = async (category, subCategory) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
  
      const response = localDatabase[category]?.[subCategory];
  
      if (response) {
        return response;
      } else {
        return `מצטער, עדיין אין לי מידע מפורט על ${subCategory} בקטגוריית ${category}. נסה שוב מאוחר יותר!`;
      }
    } catch (error) {
      throw new Error("שגיאה בשליפת המידע המקומי");
    }
  };