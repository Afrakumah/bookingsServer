export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "An api for user authentication and for bookings",
      version: "1.0.0",
      description:
        "This api will authenticate users and their booking rooms in hotels, apartments, etc",
      contact: {
        email: "opokuangelina@gmail.com",
      },
    },

    servers: [
      {
        url: "http://localhost:4000/api",
        description: "development server",
      },
    ],

    tags: [
      {
        name: "Admin",
        description: "Admin authenticates user",
      },

      {
        name: "Users",
        description: "Everything about the user and their details",
        externalDocs: {
          description: "Get more information about the users from",
          url: "https://google.com",
        },
      },

      {
        name: "Hotels",
        description: "Details about the hotels a user register",
      },

      {
        name: "Rooms",
        description: "Everything about a users room",
      },
    ],

    paths: {
      "/auth/register": {
        post: {
          summary: "sign up ",
          description: "admin registers",
          tags: ["Admin"],
          requestBody: {
            description: "Provide email and password",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Admin",
                },
              },
            },
          },

          responses: {
            200: {
              description: "Registration Successful",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                  },

                  409: {
                    description: "user already exists",
                  },
                },
              },
            },
          },
        },
      },

      "/auth/login": {
        post: {
          tags: ["Admin"],
          summary: "User Authentication",
          description: "Login a user",
          requestBody: {
            description: "Provide email and password",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Admin",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Successful operation",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    //items: { $ref: "#/components/schemas/Admin" },
                    items: {
                      type: "object",
                    },
                  },

                  401: {
                    description: "Unauthorized access",
                  },
                },
              },
            },
          },
        },
      },

      "/users/getusers": {
        get: {
          summary: "details of users in the database",
          description: "This specifies getting all users",
          tags: ["Users"],

          responses: {
            200: {
              description: "Request Successful",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/User" },
                  },

                  401: {
                    description: "Unauthorized access",
                  },
                },
              },
            },
          },
        },
      },

      "/hotels/posthotel": {
        post: {
          tags: ["Hotels"],
          summary: "Add a hotel",
          description: "post a hotel",
          requestBody: {
            description: "Provide details for adding a hotel",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Hotel",
                },
              },
            },
          },
          responses: {
            201: {
              description: "Successful operation",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                  },

                  401: {
                    description: "Unauthorized access",
                  },
                },
              },
            },
          },
        },
      },

      "/hotels/allhotels": {
        get: {
          tags: ["Hotels"],
          summary: "Get all hotels",
          description: "Get all hotels in the db",

          responses: {
            200: {
              description: "Operation successful",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                    },
                  },

                  401: {
                    description: "Unauthorized access",
                  },
                },
              },
            },
          },
        },
      },

      "/hotels/deletehotel/find/{id}": {
        delete: {
          tags: ["Hotels"],
          summary: "Delete a hotel by id",
          description: "Delete a hotel",
          operationId: "deleteHotel",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "The hotelId to delete a ticket.",
              required: true,
              schema: {
                type: "string",
                format: "ObjectId",
              },
            },
          ],

          responses: {
            200: {
              description: "Operation successful",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                    },
                  },

                  //   '401': {
                  //     'description': 'Unauthorized access'
                  //   }
                },
              },
            },
          },
        },
      },

      "/rooms/postroom/{hotelid}": {
        post: {
          tags: ["Rooms"],
          summary: "Add a room",
          description: "Add a room to a specific hotel",
          operationId: "addRoom",
          parameters: [
            {
              name: "hotelid",
              in: "path",
              description: "Add room by using hotelId",
              required: true,
              schema: {
                type: "string",
                format: "ObjectId",
              },
            },
          ],
          requestBody: {
            description: "Provide details for adding a room",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Room",
                },
              },
            },
          },
          responses: {
            201: {
              description: "Successful operation",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    //items: { $ref: "#/components/schemas/Room" },
                    // items: {
                    //   type: "object",
                    // },
                  },

                  401: {
                    description: "Unauthorized access",
                  },
                },
              },
            },
          },
        },
      },

      "/rooms/getrooms": {
        get: {
          tags: ["Rooms"],
          summary: "Get all rooms",
          description: "Get all rooms in the db",

          responses: {
            200: {
            //   description: "Operation successful",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                    },
                  },

                  401: {
                    description: "Unauthorized access",
                  },
                },
              },
            },
          },
        },
      },

      "/rooms/deleteroom/{id}/{hotelid}": {
        delete: {
          tags: ["Rooms"],
          summary: "Delete a room by roomID and hotelID",
          description: "Delete a room",
          operationId: "deleteRoom",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "The roomID to delete a ticket.",
              required: true,
              schema: {
                type: "string",
                format: "ObjectId",
              },
            },
            {
              name: "hotelid",
              in: "path",
              description: "The hotelid to delete a ticket.",
              required: true,
              schema: {
                type: "string",
                format: "ObjectId",
              },
            },
          ],

          responses: {
            200: {
              description: "Operation successful",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                    },
                  },

                  //   '401': {
                  //     'description': 'Unauthorized access'
                  //   }
                },
              },
            },
          },
        },
      },
    },


    components: {
        schemas: {
            Admin: {
                type: "object",
                properties: {
                    username: {
                        type: String,
                        required: true,
                        unique: true
                    },

                  email: {
                    type: "string",
                    description: "this is the users email",
                    required: true,
                  },
      
                  password: {
                    type: "string",
                    description: "this is the users email",
                    required: true,
                  },
        }
    },
            User: {
                    type: "object",
                    properties: {
                      email: {
                        type: "string",
                        description: "this is the users email",
                        required: true,
                      },
          
                      password: {
                        type: "string",
                        description: "this is the users email",
                        required: true,
                      },

                      username: {
                        type: String,
                        required: true,
                        unique: true
                    },
                   
                    isAdmin: {
                        type: Boolean,
                        default: false
                    },
            }
        },

        Hotel: {
            type: "object",
            properties: {
                name: {
                    type: String,
                    required: true
                },
                type: {
                    type: String,
                    required: true
                },
                city: {
                    type: String,
                    required: true
                },
                address: {
                    type: String,
                    required: true
                },
                distance: {
                    type: String,
                    required: true
                },
                photos: {
                    type: [String],
                },
                title: {
                    type: String,
                    required: true
                },
                desc: {
                    type: String,
                    required: true
                },
                rating: {
                    type: Number,
                    min: 0,
                    max: 5
                },
                rooms: {
                    type: [String],
                },
                cheapestPrice: {
                    type: Number,
                    required: true
                },
                featured: {
                    type: Boolean,
                    default: false
                },
              
            },
          },
        
          Room: {
            type: "object",
            properties: {
                title: {
                    type: String,
                    required: true
                },
                 price: {
                    type: Number,
                    required: true
                },
                maxPeople: {
                    type: Number,
                    required: true
                },
                desc: {
                    type: String,
                    required: true
                },
                roomNumber: [{
                    number:Number,
                    unavailableDates: {type: [Date]}
                }],
                // hotel: {
                //     type: "string",
                //     format: "ObjectId",
                //     description: "MongoDB id",
                //     required: true,
                //   },
            },
          },
    }
  },
},


  apis: ["./routes*.js"],

};
