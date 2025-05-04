    // login.test.js
    import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import AuthorLogin from './AuthorLogin';

    beforeEach(() => {
    global.fetch = jest.fn(); // Mock fetch globally
    });

    afterEach(() => {
    jest.restoreAllMocks(); // Restore original implementations
    });

    describe('Author Login', () => {
    test('successfully logs in an existing user', async () => {
        global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ token: "fake_token" })
        });

        const { getByLabelText, getByText } = render(<AuthorLogin />);
        
        fireEvent.change(getByLabelText(/email/i), { target: { value: 'existing@example.com' } });
        fireEvent.change(getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.click(getByText(/login/i));
        
        await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({
            email: 'existing@example.com',
            password: 'password123'
            })
        }));
        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'fake_token');
        });
    });

    test('fails to log in with incorrect credentials', async () => {
        global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ message: 'Invalid credentials' })
        });
        
        const { getByLabelText, getByText, findByText } = render(<AuthorLogin />);
        
        fireEvent.change(getByLabelText(/email/i), { target: { value: 'user@example.com' } });
        fireEvent.change(getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
        fireEvent.click(getByText(/login/i));
        
        const errorMessage = await findByText(/invalid credentials/i);
        expect(errorMessage).toBeInTheDocument();
    });
    });
