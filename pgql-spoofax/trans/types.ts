module types

imports

  signatures/-

type rules

  VarRef(Identifier(v, _), _) : ty
  where definition of v : ty
    and not ( ty == PathTy() ) else error $[Path variables not supported] on v

  Vertex(Identifier(v, _), _, Correlation(VarRef(Identifier(outer-var, _), _))) :-
  where definition of outer-var : ty
    and ty == VertexTy() else error $[Duplicate variable (variable with same name is passed from an outer query)] on v

  Edge(_, Identifier(e, _), _, _, _, Correlation(VarRef(Identifier(outer-var, _), _))) :-
  where definition of outer-var : ty
    and not(ty == ty ) /* make it always throw an error */ else error $[Duplicate variable (variable with same name is passed from an outer query)] on e

//  FunctionCall(_, _, _): UnknownTy()
//
//  CharacterSubstring(_, _, _) : StringTy()
//
//  ExtractExp(_, _) : NumericTy()
//
//  Subquery(_) : None()
//
//  IfElse(exp1, exp2, exp3): ty2
//  where exp1 : ty1
//    and exp2 : ty2
//    and exp3 : ty3
//    and (ty1 == BooleanTy() or ty1 == UnknownTy()) else error $[Boolean expected here] on exp1
//    and not (ty2 == VertexTy() or ty2 == EdgeTy()) else error $[CASE does not allow vertex or edge output] on exp2
//    and not (ty3 == VertexTy() or ty3 == EdgeTy()) else error $[CASE does not allow vertex or edge output] on exp3
//
//  // type determination of SimpleCase if based on IfElse representation
//  SimpleCase(_, _, _, ifElseRepresentation) : ty
//  where ifElseRepresentation : ty
//
//  ScalarSubquery(Subquery(NormalizedQuery(_, SelectClause(_, ExpAsVars([expAsVar|_])), _, _, _, _, _, _, _, _, _))) : ty
//  where expAsVar : ty
//    and not ( ty == VertexTy() or ty == EdgeTy() ) else error $[Scalar subquery not allowed to return a vertex or an edge] on expAsVar
//
//  ScalarSubquery(Subquery(NormalizedQuery(_, ModifyClause(_), _, _, _, _, _, _, _, _, _))) : None()
//
//  OrderByElem(exp, _, version) :-
//  where exp : ty
//    and ( not version == "v1.0" and not ty == VertexTy() ) else error $[Cannot order by vertex] on exp
//    and ( not version == "v1.0" and not ty == EdgeTy() ) else error $[Cannot order by edge] on exp
//    and not ty == ArrayTy() else error $[Cannot order by array] on exp
//
//  SetProperty(_, exp) : ty
//  where exp : ty
//    and not ( ty == VertexTy() or ty == EdgeTy() ) else error $[Cannot set the value of a property to a vertex or an edge] on exp
