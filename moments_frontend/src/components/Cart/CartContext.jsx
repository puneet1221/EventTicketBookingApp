import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';

// Create the CartContext
const CartContext = createContext();

// CartProvider component
export const CartProvider = ({ children }) => {
    const { userDetails, setUserDetails } = useContext(AppContext);
    const encodedCredentials = userDetails.encodedCredentials;
    const [cartItems, setCartItems] = useState(userDetails.cart.itemsList || []); // Initialize with user's cart items
    const [loading, setLoading] = useState(false);  // Track loading state
    const [error, setError] = useState(null);
    const [cartItemsCount,setCartItemsCount]=useState(0);
    useEffect(() => {
        if (userDetails.cart?.itemsList) {
            setCartItems(userDetails.cart.itemsList);
            setCartItemsCount(userDetails.cart.itemsList.length);
        }
    }, [userDetails]);

    // Add a cart item to the cart
    const handleAddCartItem = async (cartItem) => {
        const updatedCart = {
            ...userDetails.cart,
            itemsList: [...userDetails.cart.itemsList, cartItem], // Immutably add the new item
        };

        setLoading(true); // Set loading state
        try {
            const response = await axios.put('http://localhost:8080/user/cart/update-cart', updatedCart, {
                headers: {
                    Authorization: `Basic ${encodedCredentials}`,
                },
            });
            // Update the global userDetails state with the updated cart
            setUserDetails((prev) => ({
                ...prev,
                cart: response.data,
            }));
            // Update the local cartItems state
            setCartItems(response.data.itemsList || []);
        } catch (err) {
            console.error('Error updating cart:', err);
            setError('Failed to update cart. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Remove a cart item from the cart
    const handleRemoveCartItem = async (cartItemId) => {
        const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== cartItemId);
        const updatedCart = {
            ...userDetails.cart,
            itemsList: updatedCartItems,
        };
        setLoading(true); // Set loading state
        try {
            const response = await axios.put('http://localhost:8080/user/cart/update-cart', updatedCart, {
                headers: {
                    Authorization: `Basic ${encodedCredentials}`,
                },
            });
            setUserDetails((prev) => ({
                ...prev,
                cart: response.data,
            }));
            // Update the local cartItems state
            setCartItems(response.data.itemsList || []);
        } catch (err) {
            console.error('Error updating cart:', err);
            setError('Failed to update cart. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartItemsCount,
                setCartItems,
                handleAddCartItem,
                handleRemoveCartItem,
                loading,
                error,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use Cart context
export const useCart = () => useContext(CartContext);
