import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    userId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    subscriptionId: v.optional(v.string()),
    profileImage: v.optional(v.string()),
    endsOn: v.optional(v.number()),
    onboardingCompleted: v.boolean(),
    tokenIdentifier: v.optional(v.string()), // Add this if needed

  })
    .index('by_userId', ['userId'])
    .index('by_email', ['email'])
    .index('by_subscriptionId', ['subscriptionId'])
    .index('by_token', ['tokenIdentifier']),
  rateLimits: defineTable({
    key: v.string(),
    count: v.number(),
    expires: v.number(),
  }).index('by_key', ['key']),
  supportTickets: defineTable({
    userId: v.string(),
    email: v.string(),
    message: v.string(),
    createdAt: v.number(),
    status: v.string(), // e.g., 'open', 'closed', 'pending'
  }).index('by_userId', ['userId']),
 devices: defineTable({
    userId: v.string(),
    deviceId: v.string(),
    deviceType: v.string(), // e.g., 'mobile', 'desktop'
    lastActive: v.number(),
  }).index('by_userId', ['userId']),
  notes: defineTable({
    userId: v.string(),
    content: v.string(),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  }).index('by_userId', ['userId']),
  apiKeys: defineTable({
    userId: v.string(),
    apiKey: v.string(),
    createdAt: v.number(),
    lastUsedAt: v.optional(v.number()),
    usageCount: v.number(),
  }).index('by_userId', ['userId']),
  analytics: defineTable({
    userId: v.string(),
    eventType: v.string(), // e.g., 'login', 'purchase'
    eventData: v.optional(v.object({})), // Flexible object for event-specific data
    timestamp: v.number(),
  }).index('by_userId', ['userId']),
  feedback: defineTable({
    userId: v.string(),
    message: v.string(),
    rating: v.optional(v.number()), // e.g., 1 to 5
    createdAt: v.number(),
  }).index('by_userId', ['userId']),
  sessions: defineTable({
    userId: v.string(),
    sessionId: v.string(),
    createdAt: v.number(),
    expiresAt: v.number(),
  isActive: v.boolean(),
  }).index('by_userId', ['userId']),
  transactions: defineTable({
    userId: v.string(),
    transactionId: v.string(),
    amount: v.number(),
    currency: v.string(),
    status: v.string(), // e.g., 'pending', 'completed', 'failed'
    createdAt: v.number(),
  }).index('by_userId', ['userId']),
  plans: defineTable({
    name: v.string(),
    price: v.number(),
    features: v.array(v.string()),
    createdAt: v.number(),
  updatedAt: v.optional(v.number()),
  }).index('by_name', ['name'] ),
  coupons: defineTable({
    code: v.string(),
    discountPercentage: v.number(),
    validFrom: v.number(),
    validTo: v.number(),
    usageLimit: v.optional(v.number()),
    timesUsed: v.number(),
  }).index('by_code', ['code'] ),
  audits: defineTable({
    userId: v.string(),
    action: v.string(), // e.g., 'login', 'update_profile'
    timestamp: v.number(),
    details: v.optional(v.object({})), // Flexible object for action-specific details
  }).index('by_userId', ['userId']),
  notifications: defineTable({
    userId: v.string(),
    message: v.string(),
    isRead: v.boolean(),
    createdAt: v.number(),
  }).index('by_userId', ['userId']),
  settings: defineTable({
    userId: v.string(),
    preferences: v.object({ theme: v.string(), notifications: v.boolean() }),
    updatedAt: v.number(),
  }).index('by_userId', ['userId']),
  integrations: defineTable({
    userId: v.string(),
    service: v.string(), // e.g., 'google_drive', 'slack'
    connectedAt: v.number(),
    config: v.optional(v.object({})), // Flexible object for service-specific config
  }).index('by_userId', ['userId']),
  tasks: defineTable({
    userId: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    status: v.string(), // e.g., 'pending', 'in_progress', 'completed'
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
    dueDate: v.optional(v.number()),
  }).index('by_userId', ['userId']),
  messages: defineTable({
    senderId: v.string(),
    receiverId: v.string(),
    content: v.string(),
    sentAt: v.number(),
    isRead: v.boolean(),
  }).index('by_receiverId', ['receiverId']),
  groups: defineTable({
    name: v.string(),   
    memberIds: v.array(v.string()),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  }).index('by_name', ['name'] ),
  groupMessages: defineTable({
    groupId: v.string(),
    senderId: v.string(),
    content: v.string(),
    sentAt: v.number(),
  }).index('by_groupId', ['groupId']),
  announcements: defineTable({
    title: v.string(),
    content: v.string(),
    createdAt: v.number(),
    isActive: v.boolean(),
  }).index('by_isActive', ['isActive']),
  logs: defineTable({
    level: v.string(), // e.g., 'info', 'warning', 'error'
    message: v.string(),
    timestamp: v.number(),
    meta: v.optional(v.object({})), // Flexible object for additional metadata
  }).index('by_level', ['level']),
  bookings: defineTable({
    userId: v.string(),
    serviceId: v.string(),
    bookingDate: v.number(),
    status: v.string(), // e.g., 'confirmed', 'cancelled', 'pending'
  createdAt: v.number(),
  }).index('by_userId', ['userId']),
  services: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),  
  }).index('by_name', ['name'] ),
  reviews: defineTable({
    userId: v.string(),
    serviceId: v.string(),  
    rating: v.number(), // e.g., 1 to 5
    comment: v.optional(v.string()),
    createdAt: v.number(),
  }).index('by_serviceId', ['serviceId'] ),
  favorites: defineTable({
    userId: v.string(),
    itemId: v.string(),
    itemType: v.string(), // e.g., 'service', 'product'
    addedAt: v.number(),
  }).index('by_userId', ['userId']),
  
});

