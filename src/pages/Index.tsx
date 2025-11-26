import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Макака в космосе',
    price: 1,
    image: 'https://cdn.poehali.dev/projects/9f0fd158-6a0e-48bd-aeae-3ef537bbf36c/files/1a5c9efd-f31d-4e54-8c01-ad4114a91862.jpg',
    description: 'Настоящая космическая макака! Прошла подготовку в NASA.'
  },
  {
    id: 2,
    name: 'Жёлтая тряпка',
    price: 4,
    image: 'https://cdn.poehali.dev/projects/9f0fd158-6a0e-48bd-aeae-3ef537bbf36c/files/7f042cc1-121a-4734-a16b-de5c79406e22.jpg',
    description: 'Премиальная космическая тряпка. Идеальна для протирки звёзд.'
  }
];

const Index = () => {
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const { toast } = useToast();

  const addToCart = (productId: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
    toast({
      title: '✨ Добавлено в корзину!',
      description: 'Товар успешно добавлен',
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === Number(productId));
      return total + (product?.price || 0) * quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  const Stars = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full animate-twinkle"
          style={{
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDelay: Math.random() * 3 + 's',
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Stars />
      
      <div className="relative z-10">
        <header className="border-b border-border backdrop-blur-sm bg-background/50">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-primary">SPACE SHOP</h1>
              <p className="text-sm text-muted-foreground">Магазин космических редкостей</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Icon name="ShoppingCart" size={20} className="mr-2" />
                {getTotalItems()} товаров
              </Badge>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Итого:</p>
                <p className="text-2xl font-bold text-primary">{getTotalPrice()} FPI</p>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-5xl font-bold mb-4 text-foreground">
              🚀 Добро пожаловать в космос!
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Эксклюзивные товары прямиком с орбиты. Оплата в FPI — космической валюте будущего.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {products.map((product, index) => (
              <Card 
                key={product.id} 
                className="overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 animate-fade-in border-2 border-primary/30"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader className="p-0">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover animate-float"
                      style={{ animationDelay: `${index * 0.5}s` }}
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="text-lg font-bold bg-primary text-primary-foreground">
                        {product.price} FPI
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-2xl mb-2">{product.name}</CardTitle>
                  <CardDescription className="text-base">
                    {product.description}
                  </CardDescription>
                  {cart[product.id] && (
                    <div className="mt-4 flex items-center gap-3 bg-primary/10 rounded-lg p-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeFromCart(product.id)}
                        className="h-8 w-8"
                      >
                        <Icon name="Minus" size={16} />
                      </Button>
                      <span className="text-lg font-bold text-primary min-w-[2rem] text-center">
                        {cart[product.id]}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => addToCart(product.id)}
                        className="h-8 w-8"
                      >
                        <Icon name="Plus" size={16} />
                      </Button>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full text-lg py-6"
                    onClick={() => addToCart(product.id)}
                  >
                    <Icon name="ShoppingCart" size={20} className="mr-2" />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {getTotalItems() > 0 && (
            <div className="fixed bottom-8 right-8 animate-fade-in">
              <Card className="border-2 border-primary shadow-2xl shadow-primary/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Товаров в корзине:</p>
                      <p className="text-2xl font-bold">{getTotalItems()}</p>
                    </div>
                    <div className="border-l-2 border-border pl-4">
                      <p className="text-sm text-muted-foreground">Итого:</p>
                      <p className="text-3xl font-bold text-primary">{getTotalPrice()} FPI</p>
                    </div>
                    <Button size="lg" className="ml-4">
                      <Icon name="Rocket" size={20} className="mr-2" />
                      Оформить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>

        <footer className="border-t border-border backdrop-blur-sm bg-background/50 mt-20">
          <div className="container mx-auto px-4 py-8 text-center">
            <p className="text-muted-foreground">
              🌟 SPACE SHOP © 2025 | Доставка по всей галактике
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
