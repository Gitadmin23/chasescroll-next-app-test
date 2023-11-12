import { z } from 'zod';
import moment from 'moment';

const signUpValidation = z.object({
    username: z.string().nonempty('username cannot be empty').min(3),
    email: z.string().email().nonempty(),
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    dob: z.string().nonempty(),
    password: z.string().nonempty(),
    confirmPassword: z.string().nonempty(),
    phone: z.string().nonempty(),
}).refine(({ password, confirmPassword }) => {
    if (confirmPassword !== password) {
        return false
    } else {
        return true
    }
}, {
    message: 'password do not match',
    path: ['confirmPassword'],
})
.refine(({ dob }) => {
    const ageLimit = moment().subtract(18, 'years');
    if (moment(dob).isAfter(ageLimit)) {
        return false;
    } else {
        return true;
    }
}, {
    message: 'You must be upto 18 to register',
    path: ['dob']
})

const signInValidation = z.object({
    username: z.string().nonempty('username cannot be empty').min(3, 'must contain at least 3 characters'),
    password: z.string().nonempty('Password cannot be empty'),
})

const personinforSchema = z.object({
    // email: z.string().nonempty().email(),
    phone: z.string().nonempty().min(11),
    gender: z.string().nonempty(),
    dob: z.string().nonempty(),
});

const reportSchema = z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
});

const forgotPasswordEmailValidation = z.object({
    email: z.string().nonempty().email(),
});

const resetValidation = z.object({
    password: z.string().nonempty(),
    confirmPassword: z.string().nonempty(),
}).refine(({ password, confirmPassword }) => {
    if (confirmPassword !== password) {
        return false
    } else {
        return true
    }
}, {
    message: 'password do not match',
    path: ['confirmPassword'],
});

const communitySchema = z.object({
    name: z.string().nonempty(),
    description: z.string().nonempty(),
})

const groupChatSchema = z.object({
    name: z.string().nonempty(),
});

const editProfileSchema = z.object({
    firstName: z.string().nonempty().min(3),
    lastName: z.string().nonempty().min(3),
    username: z.string().nonempty().min(3),
    website: z.string().nonempty(),
    aboutme: z.string().nonempty().min(3),
});

const editPersonalInfoSchema = z.object({
    gender: z.string().nonempty(),
    dob: z.string().nonempty(),
});

const changePasswordSchema = z.object({
    oldPassword: z.string().min(5),
    newPassword: z.string().min(8),
    confirmPassword: z.string(),
}).refine(({ newPassword, confirmPassword }) => {
    if (confirmPassword !== newPassword) {
        return false
    } else {
        return true
    }
}, {
    message: 'password do not match',
    path: ['confirmPassword'],
});

export {
    signUpValidation,
    signInValidation,
    personinforSchema,
    reportSchema,
    forgotPasswordEmailValidation,
    resetValidation,
    communitySchema,
    groupChatSchema,
    editProfileSchema,
    editPersonalInfoSchema,
    changePasswordSchema,
}