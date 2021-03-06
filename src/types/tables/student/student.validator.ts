import Ajv, { JSONSchemaType } from 'ajv';
import { IStudentCreate, IStudentUpdate } from './IStudent';

const StudentCreateSchema : JSONSchemaType<IStudentCreate> = {
  type: "object",
  properties: {
    name_student: { type: 'string', nullable: true },
    first_name_student: { type: 'string', nullable: true},
    email_student: { type: 'string' },
  },
  required: ["email_student"],
  additionalProperties: false,
};

const StudentUpdateSchema : JSONSchemaType<IStudentUpdate> = {
  type: "object",
  properties: {
    name_student: { type: 'string', nullable: true },
    first_name_student: { type: 'string', nullable: true },
    email_student: { type: 'string', nullable: true },
  },  
  additionalProperties: false,
};

const ajv = new Ajv();
export const StudentCreateValidator = ajv.compile(StudentCreateSchema);
export const StudentUpdateValidator = ajv.compile(StudentUpdateSchema);