import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Animated,
} from 'react-native';
import {ChevronDownIcon as ChevronDownMicro} from 'react-native-heroicons/micro';

const {width} = Dimensions.get('window');

const data = [
  {
    id: '1',
    image: 'https://source.unsplash.com/800x400/?grocery',
    title: 'Çarşı İndirimleri',
    description: "Ramazana özel indirimler GetirÇarşı'da!",
  },
  {
    id: '2',
    image: 'https://source.unsplash.com/800x400/?shopping',
    title: 'Büyük İndirimler',
    description: 'Sepette ekstra fırsatlar seni bekliyor!',
  },
  {
    id: '3',
    image: 'https://source.unsplash.com/800x400/?market',
    title: 'Taze Ürünler',
    description: 'En taze sebze ve meyveleri kapına getiriyoruz!',
  },
  {
    id: '4',
    image: 'https://source.unsplash.com/800x400/?grocery',
    title: 'Çarşı İndirimleri',
    description: "Ramazana özel indirimler GetirÇarşı'da!",
  },
  {
    id: '5',
    image: 'https://source.unsplash.com/800x400/?shopping',
    title: 'Büyük İndirimler',
    description: 'Sepette ekstra fırsatlar seni bekliyor!',
  },
  {
    id: '6',
    image: 'https://source.unsplash.com/800x400/?market',
    title: 'Taze Ürünler',
    description: 'En taze sebze ve meyveleri kapına getiriyoruz!',
  },
  {
    id: '7',
    image: 'https://source.unsplash.com/800x400/?market',
    title: 'Taze Ürünler',
    description: 'En taze sebze ve meyveleri kapına getiriyoruz!',
  },
];

const data1 = [
  {id: '1', title: 'getir', image: require('./assets/images/getir-logo.png')},
  {
    id: '2',
    title: 'getirfinans',
    image: require('./assets/images/finans.png'),
  },
  {id: '3', title: 'getiryemek', image: require('./assets/images/yemek.png')},
  {
    id: '4',
    title: 'getiralışveriş',
    image: require('./assets/images/alisveris.png'),
  },
];

const data2 = [
  {id: '1', title: 'getirsu', image: require('./assets/images/getirsu.png')},
  {
    id: '2',
    title: 'getiris',
    image: require('./assets/images/getiris.jpeg'),
  },
];

const currencyData = [
  {id: '1', name: 'USD/TRY', rate: '32.45'},
  {id: '2', name: 'EUR/TRY', rate: '35.20'},
  {id: '3', name: 'GBP/TRY', rate: '41.10'},
  {id: '4', name: 'BTC/USD', rate: '68,450'},
];

const HomePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<any>(null);

  const translateX = useRef(new Animated.Value(width)).current;
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerWidth === 0) return; // Eğer genişlik ölçülmemişse, animasyon başlatma.

    const animate = () => {
      Animated.timing(translateX, {
        toValue: -containerWidth, // View'in kendi genişliği kadar kaydır
        duration: 8000, // 12 saniyede tam geçiş yap
        useNativeDriver: true,
      }).start(() => {
        requestAnimationFrame(() => {
          translateX.setValue(containerWidth); // Başa al
          animate(); // Tekrar başlat
        });
      });
    };

    animate();
  }, [containerWidth]);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const goToSlide = (index: any) => {
    flatListRef.current.scrollToIndex({index, animated: true});
  };

  const renderItem = ({item}: {item: any}) => (
    <View className="border-[1px] border-gray-200 shadow-sm rounded-md w-[168px] h-[168px] bg-white">
      <Text className="absolute font-extrabold tracking-wide text-[#5C3EBC] text-xl top-2 left-2">
        {item.title}
      </Text>

      {item.title === 'getirfinans' && (
        <View
          onLayout={event => {
            const {width} = event.nativeEvent.layout;
            setContainerWidth(width); // View'in genişliğini kaydet
          }}
          className="absolute overflow-hidden top-10">
          <Animated.View
            style={{flexDirection: 'row', transform: [{translateX}]}}>
            {currencyData.map(item => (
              <View
                key={item.id}
                style={{flexDirection: 'row', marginRight: 30}}>
                <Text
                  className="text-gray-500"
                  style={{
                    fontWeight: 'normal',
                    fontSize: 13,
                  }}>
                  {item.name}:{' '}
                </Text>
                <Text style={{color: '#FF5556', fontSize: 13}}>
                  {item.rate}
                </Text>
              </View>
            ))}
          </Animated.View>
        </View>
      )}

      {item.title === 'getiryemek' && (
        <View className="absolute top-10 left-2 flex flex-row">
          <Text className="font-semibold text-black text-xs">60.000+</Text>
          <Text className="font-normal text-black text-xs"> restoran</Text>
        </View>
      )}

      {item.title === 'getir' && (
        <View className="absolute top-9 left-2 flex flex-row">
          <Text className="font-semibold text-black text-xs">2.000+</Text>
          <Text className="font-normal text-black text-xs"> ürün</Text>
        </View>
      )}

      {item.title === 'getir' && (
        <Text className="absolute top-12 left-2 font-normal text-black text-xs">
          dakikalar içinde
        </Text>
      )}

      <Image
        source={item.image}
        className="absolute w-20 h-20 bottom-2 right-2"
      />
    </View>
  );

  const renderItem2 = ({item}: {item: any}) => (
    <View className="border-[1px] border-gray-200 shadow-sm rounded-md w-[168px] h-[84px] bg-white">
      <Text className="absolute font-extrabold tracking-wide text-[#5C3EBC] text-xl top-2 left-2">
        {item.title}
      </Text>

      {item.title === 'getirsu' && (
        <Image
          source={item.image}
          className="absolute w-20 h-12 bottom-2 right-2"
        />
      )}

      {item.title === 'getiris' && (
        <Image
          source={item.image}
          className="absolute w-20 h-8 bottom-2 right-2"
        />
      )}
    </View>
  );

  return (
    <View className="bg-[#f5f5f5] h-screen">
      <SafeAreaView style={{backgroundColor: '#5C3EBC'}}>
        <StatusBar barStyle="light-content" backgroundColor="#5C3EBC" />
      </SafeAreaView>
      <View className="bg-[#f5f5f5]">
        {/*** Adres Section ***/}
        <View>
          <TouchableOpacity
            onPress={() => {
              console.log('Hello World');
            }}
            className="flex items-start justify-center p-4 border-[1px] border-gray-100">
            <View className="flex flex-row items-center">
              <Text className="text-purple-800 font-bold">Ev, </Text>
              <Text className="flex-1" numberOfLines={1} ellipsizeMode="tail">
                Cumhuriyet Mah. Atatürk Bulv. Şahin Apartmanı Kat 4/7 Bor/Niğde
              </Text>
              <ChevronDownMicro size={20} color="black" />
            </View>
          </TouchableOpacity>
        </View>

        {/*** Hero Section ***/}
        <View className="items-center">
          <FlatList
            ref={flatListRef}
            data={data}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            onScroll={handleScroll}
            renderItem={({item}) => (
              <View className="relative w-screen items-center mb-2">
                {/* Resim */}
                <Image
                  source={require('./assets/images/herocard.jpg')}
                  className="w-full h-[200px]"
                />

                {/* Beyaz İçerik Alanı */}
                <View className="absolute bottom-[-8px] right-6 w-full">
                  <Text className="text-base text-right">{item.title}</Text>
                  <Text className="text-gray-600 text-sm text-right">
                    {item.description}
                  </Text>
                </View>
              </View>
            )}
          />

          {/* Pagination Dots */}
          <View className="flex-row justify-end self-end mr-5 my-3">
            {data.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => goToSlide(index)}
                className={`w-[7px] h-[7px] rounded-full mx-[4px] ${
                  activeIndex === index ? 'bg-[#5c3ebc]' : 'bg-gray-400'
                }`}
              />
            ))}
          </View>
        </View>

        {/*** App Section ***/}
        <View className="mt-4 items-center">
          <FlatList
            data={data1}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={{rowGap: 14}}
            columnWrapperStyle={{gap: 14}}
          />
        </View>

        {/*** App Section ***/}
        <View className="mt-4 items-center">
          <FlatList
            data={data2}
            renderItem={renderItem2}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={{rowGap: 14}}
            columnWrapperStyle={{gap: 14}}
          />
        </View>
      </View>
    </View>
  );
};

export default HomePage;
