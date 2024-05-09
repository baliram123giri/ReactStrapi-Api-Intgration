import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClinet = new QueryClient()

const ReduxProvider = ({ children }) => {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClinet}>
                {children}
            </QueryClientProvider>
        </Provider>
    )
}

export default ReduxProvider