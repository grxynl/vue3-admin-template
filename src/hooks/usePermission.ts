import {storeToRefs} from 'pinia'
import {useUserStore} from "@/store/user";
import {RolesEnum} from "@/enum/rolesEnum";


export type Role = keyof typeof RolesEnum | RolesEnum

/**
 * 判断权限，在mounted中使用，防止pinia未初始化
 */
export function usePermission() {
    const userStore = useUserStore();
    const {roles} = storeToRefs(userStore)
    const hasPermission = (value: Role | Role[]) => {
        if (Array.isArray(value)) {
           return value.some((role) => {
                let target: RolesEnum | undefined;
                if (typeof role === "string") {
                    target = RolesEnum[role];
                } else {
                    target = role
                }
                if (typeof target !== 'number' && !target) {
                    throw new Error("this role is not in the Roles enum definition");
                }
                return roles.value.includes(target);
            });
        } else {
            // If value is a key of Roles, get the corresponding value
            if (typeof value === "string") {
                value = RolesEnum[value as keyof typeof RolesEnum]
            }
            // Check if value is a user role
            return roles.value.includes(value as RolesEnum);
        }
    }

    return {hasPermission}
}
