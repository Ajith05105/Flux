from fastapi import FastAPI
from routers import exchange, blockchain

app = FastAPI()
app.include_router(exchange.router)
app.include_router(blockchain.router)
