describe("Pizza", function() {
  it("has size, a default cheese option of 'regular', and initially no toppings", function() {
    var pizza = new Pizza("small");
    expect(pizza.size).to.equal("small");
    expect(pizza.toppings).to.eql([]);
    expect(pizza.cheese).to.eql("regular");
  });

  describe("#addTopping", function() {
    it("adds a topping to a pizza", function() {
      var pizza = new Pizza("small");
      var topping = new Topping("pepperoni", 2);
      pizza.addTopping(topping);
      expect(pizza.toppings).to.eql([topping]);
    });
  });

  describe("#calculateCost", function() {
    it("calculates cost based on pizza size", function() {
      var pizza = new Pizza("medium");
      expect(pizza.calculateCost()).to.equal(10);
    });

    it("adds on the cost of each pizza topping", function() {
      var pizza = new Pizza("small");
      var topping1 = new Topping("pepperoni", 2);
      var topping2 = new Topping("mushrooms", 1.5);
      pizza.addTopping(topping1);
      pizza.addTopping(topping2);
      expect(pizza.calculateCost()).to.equal(9.5);
    });

    it("adds an extra charge for 'extra' cheese", function() {
      var pizza = new Pizza("small", "extra");
      expect(pizza.calculateCost()).to.equal(8);
    });

    it("gives a discount for no cheese", function() {
      var pizza = new Pizza("small", "none");
      expect(pizza.calculateCost()).to.equal(4);
    });
  });
});

describe("Topping", function() {
  it("has a type and cost", function() {
    var topping = new Topping("pepperoni", 2);
    expect(topping.type).to.equal("pepperoni");
    expect(topping.cost).to.equal(2);
  });

  describe("#display", function() {
    it("displays the topping info", function() {
      var topping = new Topping("pepperoni", 2);
      expect(topping.display()).to.equal("pepperoni, $2.00");
    });
  });

});

describe("PizzaCart", function() {
  it("initially contains no pizzas", function() {
    var cart = new PizzaCart();
    expect(cart.pizzas).to.eql([]);
  });

  describe("#addPizza", function() {
    it("adds a pizza to the cart", function() {
      var cart = new PizzaCart();
      var pizza = new Pizza("medium");
      cart.addPizza(pizza);
      expect(cart.pizzas).to.eql([pizza]);
    });
  });

  describe("#calculateTotalCost", function() {
    it("adds up the costs of all the pizzas", function() {
      var cart = new PizzaCart();

      var pizza1 = new Pizza("small");
      var topping1 = new Topping("pepperoni", 2);
      var topping2 = new Topping("mushrooms", 1.5);
      pizza1.addTopping(topping1);
      pizza1.addTopping(topping2);
      cart.addPizza(pizza1)

      var pizza2 = new Pizza("medium");
      var topping3 = new Topping("peppers", .5);
      var topping4 = new Topping("bacon", 1.5);
      pizza2.addTopping(topping3);
      pizza2.addTopping(topping4);
      cart.addPizza(pizza2)

      expect(cart.calculateTotalCost()).to.equal(21.5);
    });
  });

  describe("#removePizza", function() {
    it("removes a pizza from the cart", function() {
      var cart = new PizzaCart();
      var pizza = new Pizza("medium");
      cart.addPizza(pizza);
      cart.removePizza(pizza);
      expect(cart.pizzas).to.eql([]);
    });
  });

  describe("#pizzaCount", function() {
    it("counts the number of pizzas in the cart", function() {
      var cart = new PizzaCart();
      var pizza1 = new Pizza("medium");
      var pizza2 = new Pizza("small");
      var pizza3 = new Pizza("large");
      [pizza1, pizza2, pizza3].forEach(function(pizza) { cart.addPizza(pizza); });
      expect(cart.pizzaCount()).to.equal(3);
    });
  });
})
