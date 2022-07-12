"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("../product/product.service");
let CartService = class CartService {
    constructor(productService) {
        this.productService = productService;
    }
    async addItemToCart(req, res, input) {
        let listProduct = [];
        const product = await this.productService.getProductById(input.productId);
        const cookie = req.cookies.listProduct;
        if (this.checkCookie(cookie)) {
            listProduct = cookie;
            await this.isValidQuantityProduct(input.quantity, product, listProduct);
            const productExisting = listProduct.filter(item => {
                if (item.product._id === input.productId) {
                    item.quantity = item.quantity + input.quantity;
                    item.totalPrice = this.totalPriceOfItem(item.product, item.quantity);
                    return product;
                }
            });
            if (productExisting.length == 0) {
                listProduct.push({
                    product: product,
                    quantity: input.quantity,
                    totalPrice: this.totalPriceOfItem(product, input.quantity),
                });
            }
        }
        else {
            await this.isValidQuantityProduct(input.quantity, product, listProduct);
            listProduct.push({
                product: product,
                quantity: input.quantity,
                totalPrice: this.totalPriceOfItem(product, input.quantity),
            });
        }
        res.cookie('listProduct', listProduct, this.optionCookie(req));
        return true;
    }
    async getListProductInCookie(request) {
        var _a;
        return ((_a = request.cookies) === null || _a === void 0 ? void 0 : _a.listProduct) ? request.cookies.listProduct : [];
    }
    totalQuantity(req) {
        const listProduct = req.cookies.listProduct;
        let totalQuantity = 0;
        listProduct.forEach(lineItem => (totalQuantity = totalQuantity + lineItem.quantity));
        return totalQuantity;
    }
    totalPrice(req) {
        const listProduct = req.cookies.listProduct;
        let totalPrice = 0;
        listProduct.forEach(lineItem => (totalPrice = lineItem.totalPrice + totalPrice));
        return totalPrice;
    }
    async isValidQuantityProduct(quantityAddToCart, product, lineItem) {
        if (quantityAddToCart > product.quantity) {
            throw new common_1.HttpException('Không thể chọn số lượng vượt quá số lượng sản phẩm còn lại', common_1.HttpStatus.BAD_REQUEST);
        }
        const productOfCart = lineItem.filter(item => item.product._id === product._id.toString());
        if (productOfCart.length === 0) {
            return true;
        }
        const quantityCart = productOfCart[0].quantity;
        const totalQuantity = quantityCart + quantityAddToCart;
        if (totalQuantity > product.quantity) {
            throw new common_1.HttpException(`Không thể thêm sản phẩm này với số lượng ${quantityAddToCart} vì trong giỏ hàng
       đã có sản phẩm này với số lượng ${quantityCart} . Bạn chỉ có thêm ${product.quantity - quantityCart} nữa`, common_1.HttpStatus.BAD_REQUEST);
        }
        return true;
    }
    async isValidCart(lineItem) {
        for (const item of lineItem) {
            const product = await this.productService.getProductById(item.product._id.toString());
            if (product.quantity < item.quantity) {
                throw new common_1.HttpException(`Sản phẩm ${item.product.name} số lượng sản phẩm chỉ còn ${product.quantity} sản phẩm. Vui lòng giảm số lượng sản phẩm này trong giỏ hàng`, common_1.HttpStatus.BAD_REQUEST);
            }
        }
        return true;
    }
    async deleteItem(req, res, productId) {
        const cookie = req.cookies.listProduct;
        if (this.checkProductInLineItem(productId, cookie)) {
            return false;
        }
        let listProduct = [];
        if (this.checkCookie(cookie)) {
            listProduct = cookie.filter(element => element.product._id != productId);
        }
        res.cookie('listProduct', listProduct, this.optionCookie(req));
        return true;
    }
    async updateItem(input, req, res) {
        let listProduct = [];
        const cookie = req.cookies.listProduct;
        if (this.checkProductInLineItem(input.productId, cookie)) {
            return false;
        }
        if (this.checkCookie(cookie)) {
            listProduct = cookie.filter(element => {
                if (element.product._id == input.productId) {
                    element.quantity = input.quantity;
                }
                return element;
            });
        }
        res.cookie('listProduct', listProduct, this.optionCookie(req));
        return true;
    }
    deleteCart(response) {
        response.clearCookie('listProduct');
    }
    totalPriceOfItem(product, quantity) {
        const totalPrice = parseInt(product.price.toString()) * quantity;
        return totalPrice;
    }
    checkCookie(cookie) {
        if (cookie != undefined && (cookie === null || cookie === void 0 ? void 0 : cookie.lenght) != 0) {
            return true;
        }
        return false;
    }
    optionCookie(req) {
        return {
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 90000000),
            secure: req.headers['x-forwarded-proto'] === 'https',
            sameSite: 'none',
        };
    }
    checkProductInLineItem(productId, listProduct) {
        return listProduct.some(element => element.product._id !== productId);
    }
};
CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], CartService);
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map