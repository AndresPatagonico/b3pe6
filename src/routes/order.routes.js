import { Router } from 'express';
import { OrderController } from '../controllers/order.controller.js';

const router = Router();

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Obtiene todos los pedidos
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *   post:
 *     summary: Crea un nuevo pedido
 *     tags: [Orders]
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente
 *       400:
 *         description: Datos de pedido inválidos o incompletos
 */
router.get('/', OrderController.getOrders);
router.post('/', OrderController.createOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Obtiene un pedido por ID
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido no encontrado
 */
router.get('/:id', OrderController.getOrderById);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Actualiza el estado de un pedido
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Estado actualizado exitosamente
 *       400:
 *         description: Estado no válido
 *       404:
 *         description: Pedido no encontrado
 */
router.put('/:id/status', OrderController.updateOrderStatus);

export const orderRouter = router;