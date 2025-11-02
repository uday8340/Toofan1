CREATE OR REPLACE PROCEDURE p_list_user_items(p_user IN VARCHAR2)
IS
    TYPE c_ref_type IS REF CURSOR;
    c_ref c_ref_type;
    lv_item VARCHAR2(50);
BEGIN
    dbms_output.enable(10000);
 
    -- Use bind variable instead of concatenation
    OPEN c_ref FOR
        'SELECT name FROM items WHERE username = :user'
        USING p_user;
 
    LOOP
        FETCH c_ref INTO lv_item;
        EXIT WHEN c_ref%NOTFOUND;
        dbms_output.put_line(lv_item);
    END LOOP;
 
    CLOSE c_ref;
END;
