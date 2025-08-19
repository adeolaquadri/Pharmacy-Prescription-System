import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// User
export interface UserAttributes { id: string; email: string; passwordHash: string; role: 'admin' | 'user'; createdAt?: Date; updatedAt?: Date; }
type UserCreation = Optional<UserAttributes, 'id'|'role'>;
export class User extends Model<UserAttributes, UserCreation> implements UserAttributes {
  public id!: string;
  public email!: string;
  public passwordHash!: string;
  public role!: 'admin' | 'user';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
User.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin','user'), allowNull: false, defaultValue: 'user' }
}, { sequelize, modelName: 'user' });

// Patient
export interface PatientAttributes { id: string; name: string; email: string; phone: string; dateOfBirth: Date; createdAt?: Date; updatedAt?: Date; }
type PatientCreation = Optional<PatientAttributes, 'id'>;
export class Patient extends Model<PatientAttributes, PatientCreation> implements PatientAttributes {
  public id!: string;
  public name!: string;
  public email!: string;
  public phone!: string;
  public dateOfBirth!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
Patient.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone: { type: DataTypes.STRING, allowNull: false },
  dateOfBirth: { type: DataTypes.DATEONLY, allowNull: false }
}, { sequelize, modelName: 'patient' });

// Medication
export interface MedicationAttributes { id: string; name: string; stock: number; unitPrice: number; createdAt?: Date; updatedAt?: Date; }
type MedicationCreation = Optional<MedicationAttributes, 'id'>;
export class Medication extends Model<MedicationAttributes, MedicationCreation> implements MedicationAttributes {
  public id!: string;
  public name!: string;
  public stock!: number;
  public unitPrice!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
Medication.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  unitPrice: { type: DataTypes.DECIMAL(10,2), allowNull: false }
}, { sequelize, modelName: 'medication' });

// Prescription
export interface PrescriptionAttributes { id: string; patientId: string; medicationId: string; dosage: string; quantity: number; status: 'pending'|'filled'|'picked-up'; totalPrice: number; createdAt?: Date; updatedAt?: Date; }
type PrescriptionCreation = Optional<PrescriptionAttributes, 'id'|'status'|'totalPrice'>;
export class Prescription extends Model<PrescriptionAttributes, PrescriptionCreation> implements PrescriptionAttributes {
  public id!: string;
  public patientId!: string;
  public medicationId!: string;
  public dosage!: string;
  public quantity!: number;
  public status!: 'pending'|'filled'|'picked-up';
  public totalPrice!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
Prescription.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  patientId: { type: DataTypes.UUID, allowNull: false },
  medicationId: { type: DataTypes.UUID, allowNull: false },
  dosage: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.ENUM('pending','filled','picked-up'), allowNull: false, defaultValue: 'pending' },
  totalPrice: { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0 }
}, { sequelize, modelName: 'prescription' });

// Wallet
export interface WalletAttributes { id: string; patientId: string; balance: number; createdAt?: Date; updatedAt?: Date; }
type WalletCreation = Optional<WalletAttributes, 'id'|'balance'>;
export class Wallet extends Model<WalletAttributes, WalletCreation> implements WalletAttributes {
  public id!: string;
  public patientId!: string;
  public balance!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
Wallet.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  patientId: { type: DataTypes.UUID, unique: true, allowNull: false },
  balance: { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0 }
}, { sequelize, modelName: 'wallet' });

// Transaction
export interface TransactionAttributes { id: string; walletId: string; type: 'credit'|'debit'; amount: number; description: string; createdAt?: Date; updatedAt?: Date; }
type TransactionCreation = Optional<TransactionAttributes, 'id'>;
export class Transaction extends Model<TransactionAttributes, TransactionCreation> implements TransactionAttributes {
  public id!: string;
  public walletId!: string;
  public type!: 'credit'|'debit';
  public amount!: number;
  public description!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
Transaction.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  walletId: { type: DataTypes.UUID, allowNull: false },
  type: { type: DataTypes.ENUM('credit','debit'), allowNull: false },
  amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false }
}, { sequelize, modelName: 'transaction' });

// AppointmentSlot
export interface AppointmentSlotAttributes { id: string; date: string; time: string; serviceType: 'consultation'|'pickup'; isBooked: boolean; createdAt?: Date; updatedAt?: Date; }
type AppointmentSlotCreation = Optional<AppointmentSlotAttributes, 'id'|'isBooked'>;
export class AppointmentSlot extends Model<AppointmentSlotAttributes, AppointmentSlotCreation> implements AppointmentSlotAttributes {
  public id!: string;
  public date!: string;
  public time!: string;
  public serviceType!: 'consultation'|'pickup';
  public isBooked!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
AppointmentSlot.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  time: { type: DataTypes.STRING, allowNull: false },
  serviceType: { type: DataTypes.ENUM('consultation','pickup'), allowNull: false },
  isBooked: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
}, { sequelize, modelName: 'appointmentSlot' });

// Booking
export interface BookingAttributes { id: string; slotId: string; patientId: string; status: 'booked'|'cancelled'; createdAt?: Date; updatedAt?: Date; }
type BookingCreation = Optional<BookingAttributes, 'id'|'status'>;
export class Booking extends Model<BookingAttributes, BookingCreation> implements BookingAttributes {
  public id!: string;
  public slotId!: string;
  public patientId!: string;
  public status!: 'booked'|'cancelled';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
Booking.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  slotId: { type: DataTypes.UUID, allowNull: false },
  patientId: { type: DataTypes.UUID, allowNull: false },
  status: { type: DataTypes.ENUM('booked','cancelled'), allowNull: false, defaultValue: 'booked' }
}, { sequelize, modelName: 'booking' });

// Associations
Patient.hasOne(Wallet, { foreignKey: 'patientId', onDelete: 'CASCADE' });
Wallet.belongsTo(Patient, { foreignKey: 'patientId' });

Patient.hasMany(Prescription, { foreignKey: 'patientId', onDelete: 'CASCADE' });
Prescription.belongsTo(Patient, { foreignKey: 'patientId' });

Medication.hasMany(Prescription, { foreignKey: 'medicationId' });
Prescription.belongsTo(Medication, { foreignKey: 'medicationId' });

Wallet.hasMany(Transaction, { foreignKey: 'walletId', onDelete: 'CASCADE' });
Transaction.belongsTo(Wallet, { foreignKey: 'walletId' });

AppointmentSlot.hasOne(Booking, { foreignKey: 'slotId' });
Booking.belongsTo(AppointmentSlot, { foreignKey: 'slotId' });

Patient.hasMany(Booking, { foreignKey: 'patientId' });
Booking.belongsTo(Patient, { foreignKey: 'patientId' });

export default { User, Patient, Medication, Prescription, Wallet, Transaction, AppointmentSlot, Booking };
