from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import pymongo
from bson.objectid import ObjectId
from datetime import datetime
from bson import ObjectId

app = Flask(__name__)
CORS(app)

# Conexión a la base de datos MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['TicketMaster']
collection = db['users']
collection1 = db['usuario']
collection2 = db['events']
collection3 = db['tickets']
collection4 = db['ShopCar']
collection5 = db['ticketsUsers']

# Ruta para obtener un usuario por email y password
@app.route('/users', methods=['GET'])
def get_user():
    email = request.args.get('email')
    password = request.args.get('password')
    user = collection.find_one({'email': email, 'password': password})
    if user:
        user['_id'] = str(user['_id'])
        return jsonify(user)
    else:
        return jsonify({"error": "User not found."})

# Ruta para obtener un usuario por email 
@app.route('/user-by-email', methods=['GET'])
def get_user_by_email():
    email = request.args.get('email')
    user = collection.find_one({'email': email})
    if user:
        user['_id'] = str(user['_id'])
        return jsonify(user)
    else:
        return jsonify({"error": "User not found."})

# Ruta para obtener un usuario por email 
@app.route('/user-by-username', methods=['GET'])
def get_user_by_user():
    user = request.args.get('user')
    username = collection.find_one({'nombre_u': user})
    if username:
        username['_id'] = str(username['_id'])
        return jsonify(username)
    else:
        return jsonify({"error": "User not found."})

# Ruta para crear un nuevo usuario
@app.route('/create', methods=['POST'])
def create_user():
    email = request.json['email']
    password = request.json['password']
    role = request.json['role']
    last_user = collection.find_one(sort=[('_id', pymongo.DESCENDING)])
    new_id = last_user['id'] + 1
    new_user = {
        "email": email,
        "password": password,
        "id": new_id,
        "role": role
    }
    collection.insert_one(new_user)
    return jsonify({'message': 'User created successfully'})

# Ruta para crear datos de usuario
@app.route('/createUs', methods=['POST'])
def create_usu():
    userID = int(request.json['userID'])
    nombre_u = request.json['nombre_u']
    nombre_com = request.json['nombre_com']
    Fecha_N = request.json['Fecha_N']
    ci = request.json['ci']
    profilePic = request.json['profilePic']
    last_event = collection1.find_one(sort=[('_id', pymongo.DESCENDING)])
    if last_event:
        new_id = last_event['_id'] + 1
    else:
        new_id = 1
    new_user = {
        "_id": new_id,
        "userID": userID,
        "profilePic": profilePic,
        "nombre_u": nombre_u,
        "nombre_com": nombre_com,
        "Fecha_N": datetime.strptime(Fecha_N, '%Y-%m-%d').isoformat(),
        "ci": ci
    }
    collection1.insert_one(new_user)
    return jsonify({'message': 'User created successfully'})


# Ruta para crear un nuevo evento
@app.route('/create_event', methods=['POST'])
def create_event():
    nombre = request.json['nombre']
    fechaHora = request.json['fechaHora']
    pais = request.json['pais']
    ciudad = request.json['ciudad']
    categoria = request.json['categoria']
    lugar = request.json['lugar']
    last_event = collection2.find_one(sort=[('_id', pymongo.DESCENDING)])
    if last_event:
        new_id = last_event['cod_E'] + 1
    else:
        new_id = 1

    if categoria == 'Musica':
        artista = request.json['artista']
        new_event = {
            "cod_E": new_id,
            "nombre": nombre,
            "fechaHora": datetime.strptime(fechaHora, '%Y-%m-%dT%H:%M').isoformat(),
            "pais": pais,
            "ciudad": ciudad,
            "artista": artista,
            "categoria": categoria,
            "lugar":lugar
        }
    elif categoria == 'Deportes':
        equipo1 = request.json['equipo1']
        equipo2 = request.json['equipo2']
        new_event = {
            "cod_E": new_id,
            "nombre": nombre,
            "fechaHora":datetime.strptime(fechaHora, '%Y-%m-%dT%H:%M').isoformat(),
            "pais": pais,
            "ciudad": ciudad,
            "equipo1": equipo1,
            "equipo2": equipo2,
            "categoria": categoria,
            "lugar":lugar
        }
    elif categoria == 'Convencion':
        new_event = {
            "cod_E": new_id,
            "nombre": nombre,
            "fechaHora": datetime.strptime(fechaHora, '%Y-%m-%dT%H:%M').isoformat(),
            "pais": pais,
            "ciudad": ciudad,
            "categoria": categoria,
            "lugar":lugar
        }
    else:
        return jsonify({'error': 'Categoría inválida'}), 400

    collection2.insert_one(new_event)
    return jsonify({'message': 'Event created successfully'})


# Ruta para verificar si un email ya está registrado
@app.route('/users/exists', methods=['GET'])
def check_user():
    email = request.args.get('email')
    user = collection.find_one({'email': email})
    if user:
        return jsonify({"exists": True})
    else:
        return jsonify({"exists": False})

# Ruta para actualizar un usuario existente
@app.route('/usersUpdate', methods=['PUT'])
def update_user():
    id = int(request.args.get('id'))  # Convertir el id a entero
    email = request.json['email']
    password = request.json['password']
    role = request.json['role']
    if collection.find_one({"id": id}):
        collection.update_one({"id": id}, {"$set": {"email": email, "password": password, "role": role}})
        return jsonify({'message': 'Usuario actualizado correctamente'})
    else:
        return jsonify({'message': 'El usuario no existe'})
# Ruta para eliminar un usuario existente
@app.route('/usersget', methods=['GET'])
def get_userid():
    idu = int(request.args.get('idu')) # Convertir el ID del usuario a un número
    user = collection1.find_one({'userID': idu})
    if user:
        user['_id'] = str(user['_id'])
        return jsonify(user)
    else:
        return jsonify({"error": "User not found."})

# Ruta para eliminar un usuario existente
@app.route('/usersd', methods=['DELETE'])
def delete_user():
    id = int(request.args.get('id'))
    user_exists = False
    if collection1.find_one({"id": id}):
        collection1.delete_one({"id": id})
        user_exists = True
    # Verifica si el usuario existe en la colección collection
    if collection.find_one({"id": id}):
        collection.delete_one({"id": id})
        user_exists = True
    if user_exists:
        # Retorna la respuesta JSON indicando que el usuario ha sido eliminado correctamente
        return jsonify({'message': 'Usuario eliminado correctamente'})
    else:
        # El usuario no existe en ninguna de las colecciones, no se realiza ninguna acción
        return jsonify({'message': 'El usuario no tiene datos registrados'})


# Ruta para obtener usuarios por rol
@app.route('/usersr', methods=['GET'])
def get_users_by_role():
    role = request.args.get('role')  # Obtener el rol desde los parámetros de la solicitud
    users = collection.find({'role': role})  # Buscar usuarios con el rol especificado
    user_list = []
    for user in users:
        user['_id'] = str(user['_id'])
        user_list.append(user)
    if user_list:
        return jsonify(user_list)
    else:
        return jsonify({"error": "No users found for the specified role."})

# Ruta para obtener eventos
@app.route('/Events', methods=['GET'])
def get_events():
    events = list(collection2.find())
    # Excluir el campo _id de cada evento
    serialized_events = []
    for event in events:
        serialized_event = {k: v for k, v in event.items() if k != '_id'}
        serialized_events.append(serialized_event)
    return jsonify(serialized_events)


# Ruta para obtener tickets por disponibilidad
@app.route('/Tickets_Avalibity', methods=['GET'])
def get_tickets_by_availability():
    disponible = request.args.get('disponible')
    disponible = disponible.lower() == 'true'
    available_tickets = list(collection3.find({"disponible": disponible}))
    return jsonify(available_tickets)

# Ruta para obtener tickets por evento
@app.route('/TicketsE', methods=['GET'])
def get_tickets_by_event():
    event = int(request.args.get('id_event'))
    available_tickets = list(collection3.find({"id_event": event}))
    return jsonify(available_tickets)

# Ruta para obtener tickets por ID o una lista de IDs
@app.route('/Tickets', methods=['GET'])
def get_tickets_by_id():
    ticket_ids = request.args.get('_id')  # Obtener los IDs de ticket de la URL
    id_list = ticket_ids.split(',')  # Dividir los IDs en una lista

    ticket_list = []  # Lista para almacenar los tickets

    for ticket_id in id_list:
        ticket = collection3.find_one({'_id': int(ticket_id)})  # Obtener el ticket por ID
        if ticket:
            ticket['_id'] = str(ticket['_id'])
            ticket_list.append(ticket)  # Agregar el ticket a la lista si existe

    return jsonify(ticket_list)  # Devolver la lista de tickets en formato JSON


# Ruta para crear tickets
@app.route('/Tickets_Create', methods=['POST'])
def create_ticket():
    id_event = request.json['id_event']
    precio = request.json['precio']
    tipo = request.json['tipo']
    disponible = request.json['disponible']

    # Verificar si el id_event existe en la colección collection2
    if collection2.find_one({"cod_E": id_event}):
        last_ticket = collection3.find_one(sort=[('_id', pymongo.DESCENDING)])
        if last_ticket:
            new_id = last_ticket['_id'] + 1
        else:
            new_id = 1
        new_ticket = {
            "_id": new_id,
            "id_event": id_event,
            "precio": precio,
            "tipo": tipo,
            "disponible": disponible
        }
        collection3.insert_one(new_ticket)
        return jsonify({'message': 'Ticket created successfully'})
    else:
        return jsonify({'message': 'Event does not exist'})

# Ruta para modificar tickets
@app.route('/Tickets_Ava', methods=['PUT'])
def update_ticket_availability():
    ids = request.json['_id']
    disponible = request.json['disponible']
    if isinstance(ids, list):
        # Si _id es una lista, actualiza la disponibilidad para cada elemento
        for id_ticket in ids:
            id_ticket = int(id_ticket)
            collection3.update_one({"_id": id_ticket}, {"$set": {"disponible": disponible}})
    else:
        # Si _id es un solo valor, actualiza la disponibilidad para ese elemento
        id_ticket = int(ids)
        collection3.update_one({"_id": id_ticket}, {"$set": {"disponible": disponible}})
    return jsonify({'message': 'Ticket availability updated'})

# Ruta para eventos x categoria
@app.route('/Events_Category', methods=['GET'])
def get_events_by_category():
    category = request.args.get('categoria')
    events = list(collection2.find({"categoria": category}))
    serialized_events = [{k: v for k, v in event.items() if k != '_id'} for event in events]
    return jsonify(serialized_events)

# Ruta para obtener un evento por ID o una lista de IDs
@app.route('/EventsID', methods=['GET'])
def get_Event_ID():
    id_events = request.args.get('id_event')  # Obtener los IDs de evento de la URL
    id_list = id_events.split(',')  # Dividir los IDs en una lista

    event_list = []  # Lista para almacenar los eventos

    for id_event in id_list:
        event = collection2.find_one({'cod_E': int(id_event)})  # Obtener el evento por ID
        if event:
            event['_id'] = str(event['_id'])
            event_list.append(event)  # Agregar el evento a la lista si existe

    return jsonify(event_list)  # Devolver la lista de eventos en formato JSON

# Ruta para obtener información de usuarios
@app.route('/Userinfo', methods=['GET'])
def get_user_info():
    user_id = int(request.args.get('userID') ) # Obtener el ID de usuario desde los parámetros de la solicitud
    user = collection1.find_one({'userID': user_id})  # Utilizar el campo userID en lugar del campo _id
    if user:
        user['_id'] = str(user['_id'])  # Convertir el campo _id a una cadena
        return jsonify(user)
    else:
        return jsonify({"error": "User not found."})

# Ruta para actualizar información de un usuario
@app.route('/Userinfo', methods=['PUT'])
def update_user_info():
    user_id = int(request.args.get('userID'))  # Obtener el ID de usuario desde los parámetros de la solicitud
    data = request.get_json()  # Obtener los datos enviados en el cuerpo de la solicitud
    # Verificar si el usuario existe antes de realizar la actualización
    existing_user = collection1.find_one({'userID': user_id})
    if not existing_user:
        return jsonify({"error": "User not found."})
    # Actualizar los campos con los valores proporcionados en los datos recibidos
    existing_user['profilePic'] = data.get('profilePic', existing_user['profilePic'])
    existing_user['nombre_u'] = data.get('nombre_u', existing_user['nombre_u'])
    existing_user['nombre_com'] = data.get('nombre_com', existing_user['nombre_com'])
    existing_user['Fecha_N'] = data.get('Fecha_N', existing_user['Fecha_N'])
    existing_user['ci'] = data.get('ci', existing_user['ci'])
    # Realizar la actualización en la base de datos
    collection1.update_one({'userID': user_id}, {'$set': existing_user})
    return jsonify({"message": "User information updated successfully."})




# Ruta para eventos x pais
@app.route('/Events_Country', methods=['GET'])
def get_events_by_country():
    country = request.args.get('pais')
    events = list(collection2.find({"pais": country}))
    serialized_events = [{k: v for k, v in event.items() if k != '_id'} for event in events]
    return jsonify(serialized_events)


# Ruta para buscar eventos por nombre, país, ciudad o categoría
@app.route('/Events/Search', methods=['GET'])
def search_events():
    query = request.args.get('q')
    events = list(collection2.find({
        "$or": [
            {"nombre": {"$regex": query, "$options": "i"}},
            {"pais": {"$regex": query, "$options": "i"}},
            {"ciudad": {"$regex": query, "$options": "i"}},
            {"categoria": {"$regex": query, "$options": "i"}}
        ]
    }))
    serialized_events = []
    for event in events:
        serialized_event = {k: v for k, v in event.items() if k != '_id'}
        serialized_events.append(serialized_event)
    return jsonify(serialized_events)

#crear elemento carrito de compras
@app.route('/Cart', methods=['POST'])
def add_to_cart():
    last_ticket = collection4.find_one(sort=[('_id', pymongo.DESCENDING)])
    if last_ticket:
            new_id = last_ticket['_id'] + 1
    else:
            new_id = 1
    cart_item = {
        "_id": new_id,
        "userID": int(request.json['userID']),
        "ticketID": request.json['ticketID'],
        "precio":request.json['precio']
    }
    collection4.insert_one(cart_item)
    return jsonify({'message': 'Item added to cart'})

# Eliminar carrito de compras por userID
@app.route('/Cart', methods=['DELETE'])
def delete_cart_items():
    userID = int(request.args.get('userID'))
    collection4.delete_many({"userID": userID})
    return jsonify({'message': 'Cart items deleted'})

#mostrar carrito de compras por usuario
@app.route('/Cart_user', methods=['GET'])
def get_cart_items():
    userID = int(request.args.get('userID'))
    cart_items = list(collection4.find({"userID": userID}))
    serialized_items = [{k: v for k, v in item.items() if k != '_id'} for item in cart_items]
    return jsonify(serialized_items)

# Ruta para crear un nuevo tickets usuario permanente
@app.route('/createT_U', methods=['POST'])
def create_userTickets():
    last_ticket = collection5.find_one(sort=[('_id', pymongo.DESCENDING)])
    if last_ticket:
        new_id = last_ticket['_id'] + 1
    else:
        new_id = 1
    
    userID = int(request.json['userID'])
    ticketIDs = request.json['ticketID']
    
    if isinstance(ticketIDs, list):
        # Si ticketID es una lista, crea un nuevo ticket de usuario para cada elemento
        for ticketID in ticketIDs:
            new_user = {
                "_id": new_id,
                "userID": userID,
                "ticketID": ticketID
            }
            collection5.insert_one(new_user)
            new_id += 1
    else:
        # Si ticketID es un solo valor, crea un único ticket de usuario
        new_user = {
            "_id": new_id,
            "userID": userID,
            "ticketID": ticketIDs
        }
        collection5.insert_one(new_user)
    
    return jsonify({'message': 'TicketUser created successfully'})

#mostrar tickets del usuario
@app.route('/Ticket_user', methods=['GET'])
def get_ticket_user():
    userID = int(request.args.get('userID'))
    cart_items = list(collection5.find({"userID": userID}))
    return jsonify(cart_items)

if __name__ == '__main__':
    app.run(debug=True)