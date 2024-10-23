import { useMemo } from 'react';

const useCategoryTotals = (places, categories, plan) => {
  const categoryTotals = useMemo(() => {
    const totals = categories.reduce((acc, category) => {
      acc[category] = 0;
      return acc;
    }, {});

    places.forEach((place) => {
      if (categories.includes(place.category)) {
        totals[place.category] += place.price || 0;
      }
    });

    // 교통비 합산
    const totalTransportCost = plan?.routes.reduce((acc, route) => acc + (route.price || 0), 0) || 0;
    totals['교통비'] = totalTransportCost;

    return totals;
  }, [places, categories, plan]);

  const pieChartData = useMemo(
    () =>
      categories.map((category) => ({
        label: category,
        value: categoryTotals[category],
      })),
    [categories, categoryTotals]
  );

  const totalPlacePrice = useMemo(
    () => places.reduce((acc, place) => acc + (place.price || 0), 0),
    [places]
  );

  const totalRoutePrice = useMemo(
    () => plan?.routes.reduce((acc, route) => acc + (route.price || 0), 0) || 0,
    [plan]
  );

  const totalPrice = totalPlacePrice + totalRoutePrice;

  return { categoryTotals, pieChartData, totalPlacePrice, totalRoutePrice, totalPrice };
};

export default useCategoryTotals;
