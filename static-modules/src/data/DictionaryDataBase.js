export const dictionaryData = [
  {
    id: 1,
    tr: "hukuki mütalaa",
    en: "legal opinion",
    type: "concept",
    category: "Hukuk Genel",
    examples: ["Avukat, konuyla ilgili hukuki mütalaa hazırladı."],
    description: "Bir hukuki konu hakkında uzman görüşü"
  },
  {
    id: 2,
    tr: "adli yardım",
    en: "legal aid",
    type: "concept",
    category: "Hukuk Genel",
    examples: ["Maddi durumu yetersiz olan vatandaşlar adli yardımdan faydalanabilir."],
    description: "Ekonomik durumu yetersiz kişilere sağlanan hukuki destek"
  },
  // ... daha fazla örnek veri eklenebilir
];

export const searchDictionary = (query, type = "concepts") => {
  const searchQuery = query.toLowerCase().trim();
  
  return dictionaryData.filter(item => {
    if (type === "concepts") {
      return item.tr.toLowerCase().includes(searchQuery) || 
             item.en.toLowerCase().includes(searchQuery);
    } else if (type === "sentences") {
      return item.examples.some(example => 
        example.toLowerCase().includes(searchQuery)
      );
    }
    return false;
  });
};
